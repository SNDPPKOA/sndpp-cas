"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // import the icon

export function Logout() {
  const router = useRouter();

    const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have been logged out successfully.");
    router.push("/");
  };

  return (
      <div className="p-4">
        <Button
          onClick={handleLogout}
          className="w-full h-[36px] bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>
  );
}
