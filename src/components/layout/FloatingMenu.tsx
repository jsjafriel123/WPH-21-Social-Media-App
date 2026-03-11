"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function FloatingMenu() {
  const [hidden, setHidden] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`bg-background fixed bottom-6 left-1/2 z-10 flex h-16 w-86.25 -translate-x-1/2 items-center rounded-full border border-neutral-900 shadow-lg backdrop-blur-[100px] transition-transform duration-300 lg:h-20 lg:w-90 ${hidden ? "translate-y-24" : "translate-y-0"}`}
    >
      <div className="flex w-full items-center justify-around p-3">
        <button
          onClick={() => router.push("/")}
          className="h-14.5 w-23.5 cursor-pointer rounded-xl hover:shadow-[0_0_20px_var(--color-primary-200)]"
        >
          <img
            src={
              pathname === "/"
                ? "/assets/button-Home-P.svg"
                : "/assets/button-Home-W.svg"
            }
            alt="Home"
            className="object-cover"
          />
        </button>
        <button
          onClick={() => router.push("/new")}
          className="size-12 cursor-pointer rounded-full hover:shadow-[0_0_20px_var(--color-primary-200)]"
        >
          <img
            src="/assets/button-Add.svg"
            alt="Add Post"
            className="object-cover"
          />
        </button>
        <button
          onClick={() => router.push("/myprofile")}
          className="h-14.5 w-23.5 cursor-pointer rounded-xl hover:shadow-[0_0_20px_var(--color-primary-200)]"
        >
          <img
            src={
              pathname === "/myprofile"
                ? "/assets/button-Profile-P.svg"
                : "/assets/button-Profile-W.svg"
            }
            alt="Profile"
            className="object-cover"
          />
        </button>
      </div>
    </div>
  );
}
