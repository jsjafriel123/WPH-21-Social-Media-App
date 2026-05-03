"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import { DropdownNavItem, DropdownLogoutItem } from "./dropdown-nav-item";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import Link from "next/link";

// import { on } from "events";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
// import { useDeleteBook } from "@/hooks/useDeleteBook";
// import { useNavigate } from "react-router-dom";

export function MoreMenu({
  id,
  onOpenChange,
}: {
  id: number;
  onOpenChange: (open: boolean) => void;
}) {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  // const navigate = useNavigate();
  const router = useRouter();

  const handleDelete = (postId: number) => {
    toast.info(`Post ${postId} deleted successfully!`);
    onOpenChange(false);
    // router.push("/myprofile");
    // router.refresh();
    setTimeout(() => {
      router.push("/myprofile");
    }, 0);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-5">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="size-38.5 flex-col gap-4 bg-white p-4"
        >
          <DropdownMenuItem
            // asChild
            onSelect={() => {
              // setOpen(false)
              setTimeout(() => {
                onOpenChange(false); // close dialog AFTER dropdown closes
              }, 0);
              //   router.push("/myprofile");
              // setTimeout(() => {
              //   router.back();
              // }, 0);
            }}
            className="cursor-pointer gap-2 px-2 text-sm font-semibold text-neutral-950"
          >
            {/* <a href="/myprofile" className="w-full"> */}
            Profile
            {/* </a> */}
          </DropdownMenuItem>
          {/* <DropdownNavItem href="/myprofile">Profile</DropdownNavItem> */}
          <DropdownMenuItem
            onSelect={() => handleDelete(id)}
            className="cursor-pointer gap-2 px-2 text-sm font-semibold text-[#D9206E]"
          >
            Delete
          </DropdownMenuItem>
          {/* <DeleteBook bookId={id} /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
