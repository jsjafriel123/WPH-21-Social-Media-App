"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLoginMutation } from "@/features/auth/useLoginMutation";
// import { useRegister } from "@/features/auth/useRegister";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();
  // const navigate = useNavigate();
  // const { mutate, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({
      email,
      password,
    });
  };
  return (
    <section className="bg-background/20 flex h-112.5 w-86.25 flex-col items-center gap-4 rounded-2xl border border-neutral-900 px-4 py-8 backdrop-blur-[100px] lg:h-122.5 lg:w-111.5 lg:py-10">
      <div className="flex h-9 w-34.25 items-center gap-2.75">
        <img
          src="/assets/logo-White.svg"
          alt="Logo Sociality"
          className="size-7.5"
        />
        <p className="text-neutral-25 text-display-xs font-bold">Sociality</p>
      </div>
      <p className="text-neutral-25 text-display-xs font-bold">Welcome Back!</p>
      <form
        onSubmit={handleSubmit}
        className="flex h-71 w-full flex-col gap-5 lg:h-72.5"
      >
        <div className="gap-0.5">
          <Label
            htmlFor="email"
            className="text-foreground text-sm font-bold tracking-[-2%]"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="h-[48px] rounded-xl px-4 py-2"
          />
        </div>
        <div className="gap-0.5">
          <Label
            htmlFor="password"
            className="text-foreground text-sm font-bold tracking-[-2%]"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="h-[48px] rounded-xl px-4 py-2"
          />
        </div>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-primary-300 text-md text-neutral-25 h-11 w-full gap-2 rounded-[100px] p-2 font-bold tracking-[-2%] lg:h-12"
        >
          {loginMutation.isPending ? "Login..." : "Login"}
        </Button>
        <p className="lg:text-md text-foreground text-center text-sm font-semibold tracking-[-2%]">
          Don't have an account?{" "}
          <a href="/register" className="text-primary-200">
            Register
          </a>
        </p>
      </form>
    </section>
  );
}
