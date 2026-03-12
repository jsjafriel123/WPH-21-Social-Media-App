"use client";

import { useUserPosts } from "@/hooks/useUserPosts";
import { useEffect, useRef, useState } from "react";
import { EmptyUserPost } from "../ui/EmptyPost";
import CommentModal from "../feed/CommentModal";
export default function UserPostsGrid({ userName }: { userName: string }) {
  const [openComments, setOpenComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserPosts(userName);

  const loadMoreRef = useRef<HTMLDivElement>(null);

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
            <img
              key={post.id}
              src={post.imageUrl}
              onClick={() => handleClick(post.id)}
              className="aspect-square w-full cursor-pointer object-cover"
            />
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
