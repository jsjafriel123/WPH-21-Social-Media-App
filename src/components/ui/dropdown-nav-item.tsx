"use client";

import { useRouter, usePathname } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Route } from "next";

type Props = {
  href: Route;
  children: React.ReactNode;
  className?: string;
};

export function DropdownNavItem({ href, children, className }: Props) {
  const router = useRouter();
  // const pathname = usePathname();
  // const isActive = pathname === href;

  return (
    <DropdownMenuItem
      onSelect={() => {
        setTimeout(() => {
          console.log("History:", window.history);
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }, 0);
      }}
      className={cn(
        "cursor-pointer gap-2 px-2 text-sm font-semibold text-neutral-950",
        className,
      )}
    >
      {children}
    </DropdownMenuItem>
  );
}

type LogoutProps = {
  onLogout: () => void;
};

export function DropdownLogoutItem({ onLogout }: LogoutProps) {
  return (
    <DropdownMenuItem
      onSelect={onLogout}
      className="cursor-pointer text-red-500"
    >
      Logout
    </DropdownMenuItem>
  );
}
