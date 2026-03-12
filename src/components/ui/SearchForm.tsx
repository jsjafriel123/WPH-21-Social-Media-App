import { useState, useEffect } from "react";
import { Input } from "./input";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserSearchItem } from "@/types/user";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
// import { useNavigate, useLocation } from "react-router-dom";

export default function SearchForm() {
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input, 400);
  const router = useRouter();
  const { data, isLoading } = useUserSearch(debouncedSearch);

  const handleSelect = (user: UserSearchItem) => {
    setInput("");
    router.push(`/friend/${user.username}`);
  };

  return (
    <form className="relative size-auto">
      <Input
        id="search"
        type="search"
        placeholder="Search user"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-background text-foreground h-10 w-66.25 gap-1.5 rounded-full border border-neutral-900 px-3 py-2 lg:h-12 lg:w-122.75 lg:pr-4 lg:pl-10"
      />
      <button
        type="submit"
        className="absolute hidden size-5 hover:scale-105 lg:top-3.5 lg:left-3 lg:block"
      >
        <img
          src="/assets/icon-Search.svg"
          alt="Search"
          className="object-cover"
        />
      </button>

      {/* dropdown */}
      {debouncedSearch && (
        <div className="bg-background absolute mt-2 w-full rounded-md border shadow-lg">
          {isLoading && (
            <p className="text-muted-foreground p-3 text-sm">Searching...</p>
          )}

          {data?.users.map((user) => (
            <div
              key={user.id}
              onMouseDown={() => handleSelect(user)}
              className="hover:bg-muted flex cursor-pointer items-center gap-3 p-3"
            >
              <img
                src={user.avatarUrl || "/avatar.png"}
                className="h-8 w-8 rounded-full"
              />

              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-muted-foreground text-xs">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
