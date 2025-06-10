"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // import the icon

export function ViewProfileButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/userProfile')} className="flex items-center gap-2">
      <ArrowLeft className="w-4 h-4" />
      View Profile
    </Button>
  );
}

