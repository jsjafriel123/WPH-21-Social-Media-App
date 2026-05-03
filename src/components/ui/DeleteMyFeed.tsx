"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useDeletePost } from "@/hooks/useDeletePost";

export default function DeleteMyFeed({ postId }: { postId: number }) {
  const { mutate: deletePostMutate, isPending } = useDeletePost();

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"ghost"}
            disabled={isPending}
            className="h-10 cursor-pointer gap-2 px-2 text-sm font-bold text-[#EE1D52]"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold lg:text-lg lg:tracking-[-3%]">
              Delete This Post
            </AlertDialogTitle>
            <AlertDialogDescription className="lg:text-md font-semibold lg:tracking-[-2%]">
              Once deleted, you won’t be able to recover this data.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                // e.preventDefault();
                deletePostMutate(postId);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
