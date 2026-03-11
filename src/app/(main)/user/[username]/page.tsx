"use client";

import { useParams } from "next/navigation";
import { useUserPosts } from "@/hooks/useUserPosts";
import PostCard from "@/components/feed/PostCard";
import { useEffect, useRef } from "react";
export default function UserPage() {
  const params = useParams();
  const username = params.username as string;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserPosts(username);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="mx-auto max-w-[95%] space-y-6 p-4">
      <h1 className="text-xl font-semibold">@{username}</h1>

      {data?.pages.map((page) =>
        page.posts?.map((post: any) => <PostCard key={post.id} post={post} />),
      )}

      {isFetchingNextPage && (
        <p className="text-muted-foreground text-center text-sm">
          Loading more...
        </p>
      )}
      <div ref={loadMoreRef} />
    </div>
  );
}
