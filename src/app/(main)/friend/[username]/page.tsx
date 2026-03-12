"use client";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import SavedPostsGrid from "@/components/profile/SavedPostsGrid";
import LikedPostsGrid from "@/components/profile/LikedPostsGrid";
import UserPostsGrid from "@/components/profile/UserPostsGrid";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useToggleFollow } from "@/hooks/useToggleFollow";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("gallery");
  // const { user, stats } = useAuth();
  const router = useRouter();

  // read username from Url...
  const params = useParams();
  const username = params.username as string;
  const { data: user, isLoading } = useUserProfile(username);
  const toggleFollow = useToggleFollow();
  if (isLoading) return <div>Loading...</div>;

  if (!user) return <div>User not found</div>;
  // console.log(user);
  const handleFollow = () => {
    toggleFollow.mutate({
      username: user!.username,
      following: user!.isFollowing,
    });
  };
  return (
    <section className="flex h-197 w-98.25 flex-col p-4 lg:h-273 lg:w-211 lg:gap-4">
      {/* Post Container */}
      <div className="flex w-full flex-col gap-4 lg:h-48">
        {/* Header */}
        <div className="flex h-29 w-full flex-col gap-3 lg:h-16 lg:flex-row lg:justify-between">
          <div className="flex gap-3 lg:gap-5">
            <img
              src={user?.avatarUrl ?? "/assets/image-User.svg"}
              alt={user?.username}
              className="size-16 object-cover"
            />
            <div className="flex h-full w-full flex-col justify-center">
              <p className="lg:text-md text-sm font-bold tracking-[-1%] lg:tracking-[-2%]">
                {user?.username}
              </p>
              <p className="lg:text-md text-sm font-normal tracking-normal lg:tracking-[-2%]">
                {user?.name}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleFollow}
              className={`${user?.isFollowing ? "border border-neutral-900 bg-transparent" : "bg-primary-300 border-none"}flex h-10 w-77.25 justify-center gap-2 rounded-full px-4 py-1 lg:h-12 lg:w-33.75 lg:p-2`}
            >
              {user?.isFollowing ? (
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="/assets/icon-Check.svg"
                    alt="Following"
                    className="size-5"
                  />
                  <span className="text-md font-semibold tracking-[-2%]">
                    Following
                  </span>
                </div>
              ) : (
                <span className="text-md text-center font-semibold tracking-[-2%]">
                  Follow
                </span>
              )}
            </button>
            <button className="flex size-10 items-center justify-center rounded-full border border-neutral-900 lg:size-12">
              <img
                src="/assets/icon-Shared.svg"
                alt="Share"
                className="size-5 lg:size-6"
              />
            </button>
          </div>
        </div>
        <p className="lg:text-md text-sm font-normal tracking-[-2%]">
          Creating unforgettable moments with my favorite person! 📸✨ Let's
          cherish every second together!
        </p>
        {/* Stat container */}
        <div className="flex h-12.5 w-full justify-between gap-6 lg:h-16.5">
          <div className="h-12.5 w-[54.25px] gap-0.5 lg:h-16.5 lg:w-41.75">
            <p className="text-center text-lg font-bold tracking-[-3%] lg:text-xl lg:tracking-[-2%]">
              {user.counts?.post}
            </p>
            <p className="lg:text-md text-center text-xs font-normal text-neutral-400 lg:tracking-[-2%]">
              Post
            </p>
          </div>
          <div className="h-full w-px border border-neutral-900" />
          <div className="h-12.5 w-[54.25px] gap-0.5 lg:h-16.5 lg:w-41.75">
            <p className="text-center text-lg font-bold tracking-[-3%] lg:text-xl lg:tracking-[-2%]">
              {user.counts?.followers}
            </p>
            <p className="lg:text-md text-center text-xs font-normal text-neutral-400 lg:tracking-[-2%]">
              Followers
            </p>
          </div>
          <div className="h-full w-px border border-neutral-900" />
          <div className="h-12.5 w-[54.25px] gap-0.5 lg:h-16.5 lg:w-41.75">
            <p className="text-center text-lg font-bold tracking-[-3%] lg:text-xl lg:tracking-[-2%]">
              {user.counts?.following}
            </p>
            <p className="lg:text-md text-center text-xs font-normal text-neutral-400 lg:tracking-[-2%]">
              Following
            </p>
          </div>
          <div className="h-full w-px border border-neutral-900" />
          <div className="h-12.5 w-[54.25px] gap-0.5 lg:h-16.5 lg:w-41.75">
            <p className="text-center text-lg font-bold tracking-[-3%] lg:text-xl lg:tracking-[-2%]">
              {user.counts?.likes}
            </p>
            <p className="lg:text-md text-center text-xs font-normal text-neutral-400 lg:tracking-[-2%]">
              Likes
            </p>
          </div>
        </div>
      </div>
      {/* Tab */}
      <div className="mx-auto w-full p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="px-none grid h-12 w-full grid-cols-2 gap-0 rounded-none border-b-2 border-white bg-transparent pb-11">
            <TabsTrigger
              value="gallery"
              className="group h-12 items-center rounded-none border-none bg-neutral-950"
            >
              <img
                src="/assets/icon-Grid-3.svg"
                alt="Gallery"
                className="size-4 opacity-40 group-data-[state=active]:opacity-100 lg:size-5"
              />
              Gallery
            </TabsTrigger>
            <TabsTrigger
              value="liked"
              className="group h-12 items-center rounded-none border-none bg-neutral-950"
            >
              <Heart className="h-6 w-6 group-data-[state=active]:fill-white" />
              Liked
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <UserPostsGrid userName={user.username ?? ""} />
          </TabsContent>

          <TabsContent value="liked">
            <LikedPostsGrid username={user.username ?? ""} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
