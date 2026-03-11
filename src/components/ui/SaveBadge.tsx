"use client";
import { Bookmark } from "lucide-react";
import { useSavedPostIds } from "@/hooks/useSavedPostIds";
import { useToggleSavePost } from "@/hooks/useToggleSavePost";

export default function SaveBadge({ postId }: { postId: number }) {
  const { data: savedIds } = useSavedPostIds();
  const toggleSave = useToggleSavePost();
  const isSaved = savedIds?.has(postId);

  return (
    <button
      onClick={() =>
        toggleSave.mutate({
          postId,
          isSaved,
        })
      }
    >
      <Bookmark
        className={
          isSaved ? "fill-foreground text-foreground" : "text-muted-foreground"
        }
      />
    </button>
  );
}
