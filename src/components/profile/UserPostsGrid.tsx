"use client";

import { useUserPosts } from "@/hooks/useUserPosts";
import { useEffect, useRef } from "react";
import { EmptyUserPost } from "../ui/EmptyPost";

export default function UserPostsGrid({ userName }: { userName: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserPosts(userName);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
  const commentCount = data?.pages[0]?.pagination.total ?? 0;

  return commentCount === 0 ? (
    <div className="flex h-100 w-full items-center justify-center">
      <EmptyUserPost />
    </div>
  ) : (
    <div>
      <div className="mt-4 grid grid-cols-3 gap-1">
        {data?.pages.map((page) =>
          page.posts.map((post: any) => (
            <img
              key={post.id}
              src={post.imageUrl}
              className="aspect-square w-full object-cover"
            />
          )),
        )}
      </div>

      <div ref={loadMoreRef} />

      {isFetchingNextPage && (
        <p className="py-4 text-center text-sm">Loading...</p>
      )}
    </div>
  );
}
