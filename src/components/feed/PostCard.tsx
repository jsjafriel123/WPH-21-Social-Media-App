"use client";

import { FeedItem } from "@/types/feed";
import { timeAgo } from "@/lib/time";
import { useToggleLike } from "@/hooks/useToggleLike";
import { Heart } from "lucide-react";
import { useState } from "react";
import CommentModal from "./CommentModal";
import SaveBadge from "../ui/SaveBadge";
interface Props {
  post: FeedItem;
}

export default function PostCard({ post }: Props) {
  const [openComments, setOpenComments] = useState(false);
  const toggleLike = useToggleLike();

  const handleLike = () => {
    toggleLike.mutate({
      postId: post.id,
      liked: post.likedByMe,
    });
  };
  return (
    <div className="flex h-142.25 w-91 flex-col gap-2 lg:h-214.5 lg:w-150 lg:gap-3">
      <div className="flex h-103.25 w-full flex-col gap-2 lg:h-169 lg:gap-3">
        <div className="flex h-11 w-full gap-2 lg:h-16 lg:gap-3">
          <img
            src={post.author.avatarUrl ?? "/assets/image-User.svg"}
            alt={post.author.username}
            className="size-11 object-cover lg:size-16"
          />
          <div className="flex h-full w-full flex-col justify-center">
            <p className="lg:text-md text-sm font-bold tracking-[-1%] lg:tracking-[-2%]">
              {post.author.username}
            </p>
            <p className="text-xs font-normal tracking-normal text-neutral-400 lg:text-sm lg:tracking-[-2%]">
              {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>
        <img
          src={post.imageUrl ?? "/assets/image-Post.svg"}
          alt={String(post.id)}
          className="size-90.25 rounded-md object-cover lg:size-150"
        />
      </div>
      {/* Action */}
      <div className="flex h-7 w-full justify-between lg:h-7.5">
        <div className="flex h-full w-42 gap-3 lg:w-46.25 lg:gap-4">
          <div className="flex h-7 w-12 items-center gap-1.5">
            <button
              onClick={handleLike}
              className="flex size-6 cursor-pointer items-center justify-center gap-1 rounded-md"
            >
              <Heart
                size={20}
                className={
                  post.likedByMe
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }
              />
            </button>
            <span className="text-sm font-semibold tracking-[-2%]">
              {post.likeCount}
            </span>
          </div>
          <div className="flex h-7 w-12 items-center gap-1.5">
            <button
              onClick={() => setOpenComments(true)}
              className="flex size-6 cursor-pointer items-center justify-center gap-1 rounded-md"
            >
              <img
                src="/assets/icon-Comment.svg"
                alt="Comment"
                className="size-6"
              />
            </button>
            <span className="text-sm font-semibold tracking-[-2%]">
              {post.commentCount}
            </span>
          </div>
          <div className="flex h-7 w-12 items-center gap-1.5">
            <button
              //   onClick={() => setOpenComments(true)}
              className="flex size-6 cursor-pointer items-center justify-center gap-1 rounded-md"
            >
              <img
                src="/assets/icon-Shared.svg"
                alt="Shared"
                className="size-6"
              />
            </button>
            <span className="text-sm font-semibold tracking-[-2%]">
              {post.likeCount}
            </span>
          </div>
        </div>
        <SaveBadge postId={post.id} />
      </div>
      {/* Post content */}
      <div className="flex h-28 w-full flex-col">
        <p className="text-sm font-bold tracking-[-1%]">
          {post.author.username}
        </p>
        <p className="text-sm font-normal tracking-[-2%]">{post.caption}</p>
        <p className="text-primary-200 text-sm font-bold tracking-[-1%]">
          Show More
        </p>
      </div>
      <CommentModal
        open={openComments}
        onOpenChange={setOpenComments}
        post={post}
      />
    </div>
  );
}
