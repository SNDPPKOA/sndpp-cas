"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthday: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmPassword, ] = useState("");
  const [, setError] = useState("");
  const [password, ] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    localStorage.setItem("signupData", JSON.stringify(form));
    router.push("/signup2");

    setError("");
    // Proceed with signup logic (e.g., save to Firebase or Firestore)
    console.log("Passwords match, submit the form!");
  };

  return (
    <form
      className={cn("flex flex-col justify-center gap-6 ", className)}
      {...props}
      onSubmit={handleNext}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-muted-foreground font-bold">
          CREATE YOUR ACCOUNT
        </h1>
        <p className="text-xl  font-semibold">Personal Information</p>
      </div>

      <div className="flex justify-between items-center gap-1">
        <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
        <div className="bg-[#FEFEFE] flex-1 min-w-[80px]   h-[10px] rounded"></div>
        <div className="bg-[#FEFEFE] flex-1 min-w-[80px]   h-[10px] rounded"></div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Juan-Example"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Dela Cruz-Example"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="Sitio Tabing Ilog"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="baptism"
            className="text-sm font-medium text-gray-700 dark:text-white"
          >
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            required
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
            value={form.birthday}
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Bretman-Example"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            value={form.password}
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <Input
            id="confirmPassword"
            value={form.confirmPassword}
            type="password"
            required
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>

        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="./login" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
