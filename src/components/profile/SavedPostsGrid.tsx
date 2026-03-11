"use client";

import { useSavedPosts } from "@/hooks/useSavedPosts";
import { Fragment, useEffect, useRef, useState } from "react";
export default function SavedPostsGrid() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSavedPosts();

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

  return (
    <div>
      <div className="mt-4 grid grid-cols-3 gap-1">
        {data?.pages.map((page) =>
          page.posts.map((post: any) => (
            <Fragment key={post.id}>
              <img
                src={post.imageUrl}
                // onClick={() => setSelectedPost(post)}
                className="aspect-square w-full object-cover"
              />
            </Fragment>
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
