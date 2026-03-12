"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlice";
import SearchForm from "@/components/ui/SearchForm";
import type { AppDispatch } from "@/store";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  // console.log("isAuth", isAuthenticated);
  // console.log("user", user);
  // console.log("user", stats);
  const router = useRouter();

  const LoginButton = () => {
    return (
      //   <div className="flex h-14 w-98.25 items-center justify-center gap-3 px-4 pb-4 lg:p-0 lg:h-11 lg:w-68">
      <>
        {isAuthenticated ? (
          <div className="flex items-center gap-4 lg:h-12 lg:w-38 lg:gap-3.25 lg:pr-2">
            <button
              onClick={() => {
                userOpen ? setUserOpen(false) : setUserOpen(true);
              }}
              className="flex w-full items-center gap-4 rounded-full lg:h-12"
            >
              <div className="rounded-full lg:size-12">
                <img
                  src={
                    user?.avatarUrl ? user?.avatarUrl : "/assets/image-User.svg"
                  }
                  alt={user?.name}
                  className="size-10 rounded-full object-fill lg:size-12"
                />
              </div>
              <p className="line-clamp-1 overflow-hidden rounded-r-full text-lg font-semibold tracking-[-2%] overflow-ellipsis">
                {user?.name}
              </p>
            </button>
          </div>
        ) : (
          <div className="flex h-14 w-98.25 items-center justify-center gap-3 px-4 pb-4 lg:h-11 lg:w-68 lg:p-0">
            <Link href="/login">
              <Button
                variant="outline"
                className="lg:text-md h-[40px] w-[174.5px] gap-2 rounded-[100px] p-2 text-sm font-bold tracking-[-1%] lg:h-11 lg:w-32.5 lg:tracking-[-2%]"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary-300 lg:text-md text-neutral-25 h-[40px] w-[174.5px] gap-2 rounded-[100px] p-2 text-sm font-bold tracking-[-1%] lg:h-11 lg:w-32.5 lg:tracking-[-2%]">
                Register
              </Button>
            </Link>
          </div>
        )}
        {/* </div> */}
      </>
    );
  };

  const MobileMenu = () => {
    return (
      <div
        className={`${open ? "translate-y-0" : "-translate-y-37.5"} bg-background absolute top-[64px] left-0 z-10 flex h-14 w-full items-center justify-center`}
      >
        <LoginButton />
      </div>
    );
  };

  const SearchMenu = () => {
    return (
      <div
        className={`${searchOpen ? "translate-y-0" : "-translate-y-17"} bg-background absolute top-0 left-0 z-10 flex h-[64px] w-full items-center justify-between border-b border-neutral-900 px-4`}
      >
        <img
          src="/assets/logo-White.svg"
          alt="Logo Sociality"
          onClick={() => router.push("/")}
          className="size-7.5"
        />
        <SearchForm />
        <button onClick={() => setSearchOpen(false)} className="size-6">
          <img src="/assets/icon-X-White.svg" alt="Close" className="size-6" />
        </button>
      </div>
    );
  };

  const UserMenu = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
      localStorage.removeItem("token");
      document.cookie = "token=; Max-Age=0; path=/";

      dispatch(logout());
      setUserOpen(false);
      router.push("/login");
    };
    return (
      <div
        className={`${userOpen ? "translate-y-0" : "-translate-y-71 lg:-translate-y-75"} bg-background absolute top-[64px] left-0 z-10 flex h-50 w-full flex-col gap-4 rounded-2xl p-4 shadow-[0px_0px_20px_0px_#CBCACA40] lg:top-[80px] lg:left-284 lg:w-46`}
      >
        <Link href="/myprofile" onClick={() => setUserOpen(false)}>
          <p className="lg:text-md text-foreground text-sm font-semibold tracking-[-2%]">
            Profile
          </p>
        </Link>

        <button onClick={handleLogout} className="cursor-pointer text-left">
          <p className="lg:text-md text-primary-200 text-sm font-semibold tracking-[-2%]">
            Logout
          </p>
        </button>
      </div>
    );
  };

  return (
    <section className="bg-background fixed z-40 flex h-[64px] w-98.25 items-center justify-between border-b border-neutral-900 px-4 lg:h-[80px] lg:w-360 lg:px-30">
      <div className="flex items-center justify-center lg:h-9 lg:w-34.25 lg:gap-2.75">
        <img
          src="/assets/logo-White.svg"
          alt="Logo Sociality"
          onClick={() => router.push("/")}
          className="size-7.5 cursor-pointer"
        />
        <span className="lg:text-display-xs hidden font-bold lg:block">
          Sociality
        </span>
      </div>
      <div className="hidden lg:flex">
        <SearchForm />
      </div>
      <div className="hidden lg:flex">
        <LoginButton />
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        <button
          onClick={() => setSearchOpen(true)}
          className="size-6 rounded-md"
        >
          <img
            src="/assets/icon-Search.svg"
            alt="Search"
            className="object-fill"
          />
        </button>
        {isAuthenticated ? (
          <div className="flex h-10 w-fit items-center gap-4">
            <button
              onClick={() => setUserOpen((prev) => !prev)}
              className="size-10 rounded-full"
            >
              <img
                src={
                  user?.avatarUrl ? user?.avatarUrl : "/assets/image-User.svg"
                }
                alt={user?.name}
                className="size-10 rounded-full object-fill"
              />
            </button>
          </div>
        ) : (
          <div className="flex h-7 w-[40px] items-center justify-end gap-4 lg:hidden">
            <button
              onClick={() => setOpen(false)}
              className={`${open ? "flex" : "hidden"} rounded-md`}
            >
              <img
                src="/assets/icon-X-White.svg"
                alt="Close Button"
                className="size-[24px]"
              />
            </button>
            <button
              onClick={() => setOpen(true)}
              className={`${open ? "hidden" : "flex"} rounded-md`}
            >
              <img
                src="/assets/icon-Hamburger.svg"
                alt="Mobile Button"
                className="size-[24px]"
              />
            </button>
          </div>
        )}
      </div>
      <MobileMenu />
      <UserMenu />
      <SearchMenu />
    </section>
  );
}
