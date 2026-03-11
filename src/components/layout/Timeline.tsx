"use client";

import { useFeeds } from "@/hooks/useFeed";
import PostCard from "@/components/feed/PostCard";
import { useRef, useEffect } from "react";
export default function Timeline() {
  // const { data, isLoading } = useFeed();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFeeds();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      },
    );
    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <section className="flex max-h-593 w-90.25 flex-col items-center gap-4 lg:max-h-894 lg:w-150 lg:gap-6">
      {/* Card */}
      {data?.pages.map((page) =>
        page.items.map((post) => <PostCard key={post.id} post={post} />),
      )}
      <div ref={loadMoreRef} />

      {isFetchingNextPage && (
        <p className="text-muted-foreground text-center text-sm">
          Loading more...
        </p>
      )}
    </section>
  );
}
