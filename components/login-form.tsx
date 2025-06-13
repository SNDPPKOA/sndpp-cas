


"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(""); // This 'error' state is not currently used to display errors to the user. Consider adding an error message display.

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Check for bypassed user first
    if (username === "OfficersAttendance" && password === "123") {
      // Save data manually
      localStorage.setItem(
        "user",
        // IMPORTANT: Add 'uid' for bypassed users too if they need a profile page
        JSON.stringify({ uid: "officer-attendance-uid", username: "OfficersAttendance", role: "officer" })
      );
      router.push("/attendanceOfficers");
      return;
    } else if (username === "Admin" && password === "123") {
      // Save data manually
      localStorage.setItem(
        "user",
        // IMPORTANT: Add 'uid' for bypassed users too if they need a profile page
        JSON.stringify({ uid: "admin-uid", username: "Admin", role: "admin" }) // Assuming a unique UID for admin
      );
      router.push("/dashboard");
      return;
    }

    // 2. Proceed with normal Firebase auth for others
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", "==", username),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the document data
        const docData = querySnapshot.docs[0].data();
        // Get the document ID (this is your 'uid')
        const docId = querySnapshot.docs[0].id;

        // Combine the document data with its ID to form the complete user object
        const userWithUid = { ...docData, uid: docId }; // <--- HERE'S THE CRITICAL CHANGE

        localStorage.setItem("user", JSON.stringify(userWithUid)); // <--- Save the complete object
        router.push("/dashboardUsers");
      } else {
        setError("Invalid username or password."); // Set error for display
        alert("Invalid username or password."); // Keep alert for immediate feedback
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again."); // Set error for display
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Username below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Bretman-Example"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && ( // Display error message if present
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="./signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
