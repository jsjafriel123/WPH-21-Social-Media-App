"use client";

import { useSavedPosts } from "@/hooks/useSavedPosts";
import { Fragment, useEffect, useRef, useState } from "react";
import { EmptyUserPost } from "../ui/EmptyPost";
import CommentModal from "../feed/CommentModal";
import type { FeedItem } from "@/types/feed";

export default function SavedPostsGrid() {
  const [openComments, setOpenComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handleClick = (postId: any) => {
    setSelectedPost(postId);
    setOpenComments(true);
  };

  const postCount = data?.pages[0]?.pagination.total ?? 0;

  return postCount === 0 ? (
    <div className="flex h-100 w-full items-center justify-center">
      <EmptyUserPost />
    </div>
  ) : (
    <div>
      <div className="mt-4 grid grid-cols-3 gap-1">
        {data?.pages.map((page) =>
          page.posts.map((post: any) => (
            <Fragment key={post.id}>
              <img
                src={post.imageUrl}
                onClick={() => handleClick(post.id)}
                className="aspect-square w-full cursor-pointer object-cover"
              />
            </Fragment>
          )),
        )}
      </div>
      <CommentModal
        open={openComments}
        onOpenChange={setOpenComments}
        postId={selectedPost}
      />
      <div ref={loadMoreRef} />

      {isFetchingNextPage && (
        <p className="py-4 text-center text-sm">Loading...</p>
      )}
    </div>
  );
}
