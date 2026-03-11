"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { setAuth } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { useRegisterMutation } from "@/features/auth/useRegisterMutation";
// import { useRegister } from "@/features/auth/useRegister";
export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  // const navigate = useNavigate();
  // const { mutate, isPending } = useRegister();

  // Password Validation
  const showMismatch = password2.length > 0 && password !== password2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      name: userName,
      username: userName,
      phone,
      email,
      password,
    });
  };

  return (
    <section className="bg-background/20 flex h-186.5 w-86.25 flex-col items-center gap-4 rounded-2xl border border-neutral-900 px-4 py-8 backdrop-blur-[100px] lg:h-196 lg:w-130.75 lg:py-10">
      <div className="flex h-9 w-34.25 items-center gap-2.75">
        <img
          src="/assets/logo-White.svg"
          alt="Logo Sociality"
          className="size-7.5"
        />
        <p className="text-neutral-25 text-display-xs font-bold">Sociality</p>
      </div>
      <p className="text-neutral-25 text-display-xs font-bold">Register</p>
      <form
        onSubmit={handleSubmit}
        className="flex h-144.5 w-full flex-col gap-5 lg:h-146"
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
            htmlFor="name"
            className="text-foreground text-sm font-bold tracking-[-2%]"
          >
            Username
          </Label>
          <Input
            id="username"
            type="name"
            placeholder="Enter your user name"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
            className="h-[48px] rounded-xl px-4 py-2"
          />
        </div>
        <div className="gap-0.5">
          <Label
            htmlFor="phone"
            className="text-foreground text-sm font-bold tracking-[-2%]"
          >
            Phone number
          </Label>
          <Input
            id="phone"
            type="phone"
            placeholder="Enter your phone number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
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
        <div className="gap-0.5">
          <Label
            htmlFor="password2"
            className="text-foreground text-sm font-bold tracking-[-2%]"
          >
            Confirm Password
          </Label>
          <Input
            id="password2"
            type="password"
            placeholder="Enter your confirm password"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
            // className="h-[48px] px-4 py-2"
            // />
            className={`h-[48px] rounded-xl px-4 py-2 ${showMismatch ? "border-[#EE1D52] focus-visible:ring-[#EE1D52]" : ""}`}
          />
          <p
            className={`${showMismatch ? "block" : "hidden"} text-[12px]/[24px] text-[#EE1D52]`}
          >
            Password not matched
          </p>
        </div>

        <Button
          type="submit"
          disabled={registerMutation.isPending || showMismatch}
          className="bg-primary-300 text-md text-neutral-25 h-11 w-full gap-2 rounded-[100px] p-2 font-bold tracking-[-2%] lg:h-12"
        >
          {registerMutation.isPending ? "Registering..." : "Submit"}
        </Button>
        <p className="lg:text-md text-foreground text-center text-sm font-semibold tracking-[-2%]">
          Already have an account?{" "}
          <a href="/login" className="text-primary-200">
            Log in
          </a>
        </p>
      </form>
    </section>
  );
}
