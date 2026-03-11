import { FeedItem } from "@/types/feed";
import { useToggleLike } from "@/hooks/useToggleLike";
import { Heart } from "lucide-react";
import SaveBadge from "./SaveBadge";
interface Props {
  post: FeedItem;
}
export default function PostAction({ post }: Props) {
  const toggleLike = useToggleLike();

  const handleLike = () => {
    toggleLike.mutate({
      postId: post.id,
      liked: post.likedByMe,
    });
  };
  return (
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
            //   onClick={() => setOpenComments(true)}
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
  );
}
