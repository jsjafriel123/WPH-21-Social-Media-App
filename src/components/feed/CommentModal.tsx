"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateComment } from "@/hooks/useCreateComment";
import { useDeleteComment } from "@/hooks/useDeleteComment";
import { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useComments } from "@/hooks/useComments";
import { Fragment } from "react";
import { timeAgo } from "@/lib/time";
import PostAction from "@/components/ui/PostAction";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { usePostById } from "@/hooks/usePostById";
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number | null; //FeedItem | null;
}

export default function CommentModal({ open, onOpenChange, postId }: Props) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const createCommentMutation = useCreateComment(postId!);
  const deleteMutation = useDeleteComment(postId!);
  // Read Post details
  const { data: post, isLoading: postLoading } = usePostById(postId!);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useComments(postId!);

  const { user } = useAuth();

  const commentCount = data?.pages[0]?.pagination.total ?? 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = () => {
    if (!comment.trim()) return;

    createCommentMutation.mutate(comment);
    setComment("");
  };

  const handleEmojiClick = (emojiData: any) => {
    setComment((prev) => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  if (!postId) return null;
  if (postLoading) return <div>Loading...</div>;
  if (!post) return null;
  const isUser = post.author?.id === user?.id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        className="fixed top-auto right-0 bottom-0 left-1/2 flex h-148 w-98.25 -translate-x-1/2 translate-y-0 justify-center gap-0 rounded-2xl border-none bg-neutral-950/30 px-0 pt-10 pb-0 sm:max-w-300 lg:top-1/2 lg:left-1/2 lg:h-192 lg:w-300 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:pt-12"
      >
        <div className="hidden lg:block lg:size-180">
          <img src={post.imageUrl} className="h-full w-full object-contain" />
        </div>
        <div className="flex size-full flex-col rounded-b-2xl bg-neutral-950 lg:h-180 lg:w-120 lg:gap-11.5 lg:rounded-bl-none lg:p-5">
          <div className="flex h-134.5 w-full flex-col gap-4">
            <DialogHeader className="hidden h-48.5 w-full flex-col lg:flex">
              <DialogTitle className="flex h-11.5 w-full items-center justify-between gap-3">
                <div className="flex h-full w-3/4 items-center gap-2">
                  <img
                    src={post.author?.avatarUrl ?? "/assets/image-User.svg"}
                    alt={post.author?.username ?? "User name"}
                    className="rounded-full object-cover lg:size-10"
                  />
                  <div className="flex h-full w-full flex-col justify-center gap-0.5">
                    <p className="text-sm font-bold tracking-[-1%]">
                      {post.author?.username}
                    </p>
                    <p className="text-xs font-normal tracking-normal text-neutral-400">
                      {timeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onOpenChange(false);
                    isUser
                      ? router.push("/myprofile")
                      : post.author?.username &&
                        router.push(`/friend/${post.author?.username}`);
                  }}
                  className="flex size-6 cursor-pointer rounded-full bg-transparent text-lg font-bold"
                >
                  <img
                    src="/assets/icon-More.svg"
                    alt="More"
                    className="object-contain"
                  />
                </button>
              </DialogTitle>
              <div className="h-11xl flex w-full overflow-y-auto">
                <p className="text-sm tracking-[-2%]">{post.caption}</p>
              </div>
            </DialogHeader>

            <div className="hidden h-px w-full border border-neutral-900 lg:flex" />

            <div className="flex w-full flex-col gap-3 px-4 pt-4 pb-8 lg:p-0">
              <p className="text-md h-7.5 w-full font-bold tracking-[-2%]">
                Comments ({commentCount})
              </p>
              <div className="flex h-97 w-full flex-col gap-3 overflow-y-auto lg:h-67.5">
                {/* comments list placeholder */}
                {commentCount === 0 && (
                  <div className="flex h-38.75 w-full flex-col items-center justify-center gap-1">
                    <p className="text-md font-bold tracking-[-2%]">
                      No comments yet
                    </p>
                    <p className="text-sm font-normal tracking-[-2%] text-neutral-400">
                      Start the conversation
                    </p>
                  </div>
                )}
                {isLoading && <p>Loading comments...</p>}
                {data?.pages.map((page) =>
                  page.comments.map((comment) => (
                    <Fragment key={comment.id}>
                      <div className="flex min-h-22 w-full flex-col gap-2">
                        <div className="flex h-11 w-full items-center gap-2">
                          <img
                            src={
                              comment.author.avatarUrl ||
                              "/assets/image-User.svg"
                            }
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex w-full flex-col">
                            <p className="text-xs font-semibold">
                              {comment.author.username}
                            </p>
                            <p className="text-xs font-normal tracking-[-3%] text-neutral-400">
                              {timeAgo(comment.createdAt)}
                            </p>
                          </div>
                          {comment.author?.id === user?.id && (
                            <button
                              onClick={() => deleteMutation.mutate(comment.id)}
                              className="flex size-6 cursor-pointer items-center justify-center"
                            >
                              <img
                                src="/assets/icon-Trash.svg"
                                alt="Delete comment"
                                className="object-fill"
                              />
                            </button>
                          )}
                        </div>
                        <p className="flex w-full">{comment.text}</p>
                      </div>
                      <div className="h-px w-full border border-neutral-900" />
                    </Fragment>
                  )),
                )}
                {isFetchingNextPage && (
                  <p className="text-muted-foreground text-xs">
                    Loading more...
                  </p>
                )}
              </div>
              {/* Action */}
              <div className="hidden lg:flex">
                <PostAction post={post} />
              </div>
              {/* Comment Form */}
              <div className="relative flex h-12 w-full items-center gap-2">
                {showEmoji && (
                  <div ref={pickerRef} className="absolute bottom-14">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      theme={Theme.DARK}
                      previewConfig={{
                        showPreview: false,
                      }}
                    />
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEmoji((prev) => !prev);
                  }}
                  className="flex size-12 cursor-pointer items-center justify-center rounded-xl border border-neutral-900 p-2.5"
                >
                  <Smile size={24} />
                </button>
                <input
                  ref={inputRef}
                  placeholder="Add comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-xl border border-neutral-900 bg-neutral-950 px-3 py-2 pr-12 pl-3 text-sm lg:pr-15"
                />
                <button
                  disabled={!comment}
                  onClick={() => handleSubmit()}
                  className={`${!comment ? "text-neutral-600" : "text-primary-200 cursor-pointer"} absolute left-80 rounded-2xl text-sm font-bold lg:left-98`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
