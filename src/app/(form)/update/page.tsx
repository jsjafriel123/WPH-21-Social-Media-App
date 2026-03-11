"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();

  return (
    <section className="flex w-98.25 flex-col items-center gap-4 pb-16 lg:w-169.75">
      <div className="flex gap-2 self-start lg:gap-3">
        <button className="flex size-6 cursor-pointer items-center justify-center rounded-full lg:size-8">
          <img
            src="/assets/icon-ArrowLeft.svg"
            alt="Back"
            onClick={() => router.back()}
            className="size-3.5 lg:size-[18.67px]"
          />
        </button>
        <p className="text-md lg:text-display-xs flex items-center font-semibold tracking-[-2%] lg:tracking-normal">
          Edit Profile
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-12">
        {/* Photo */}
        <div className="flex h-34 w-full flex-col items-center gap-4 lg:w-40">
          <img src="/assets/image-User.svg" alt="Avatar" className="size-20" />
          <button className="border-neutral-900px-4 flex h-10 w-40 items-center justify-center gap-2 rounded-full border border-neutral-900 bg-neutral-950 py-2 text-sm font-bold tracking-[-1%]">
            Change Photo
          </button>
        </div>
        <div className="flex w-full flex-col gap-4 lg:gap-6">
          {/* Data */}
          <div className="flex w-full flex-col gap-4 lg:gap-6">
            <div className="flex w-full flex-col gap-0.5">
              <label
                htmlFor="name"
                className="text-sm font-bold tracking-[-2%]"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="h-12 gap-2 rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-2"
              />
            </div>
            <div className="flex w-full flex-col gap-0.5">
              <label
                htmlFor="userName"
                className="text-sm font-bold tracking-[-2%]"
              >
                User name
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                required
                onChange={(e) => setUserName(e.target.value)}
                className="h-12 gap-2 rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-2"
              />
            </div>{" "}
            <div className="flex w-full flex-col gap-0.5">
              <label
                htmlFor="Email"
                className="text-sm font-bold tracking-[-2%]"
              >
                Username
              </label>
              <input
                id="Email"
                type="text"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 gap-2 rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-2"
              />
            </div>{" "}
            <div className="flex w-full flex-col gap-0.5">
              <label
                htmlFor="phone"
                className="text-sm font-bold tracking-[-2%]"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 gap-2 rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-2"
              />
            </div>{" "}
            <div className="flex w-full flex-col gap-0.5">
              <label htmlFor="bio" className="text-sm font-bold tracking-[-2%]">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                required
                onChange={(e) => setBio(e.target.value)}
                className="h-25.25 gap-2 rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-2"
              />
            </div>
          </div>
          <button className="bg-primary-300 h-10 w-full rounded-full text-sm font-bold tracking-[-1%]">
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
