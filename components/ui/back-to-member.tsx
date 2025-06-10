"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // import the icon

export function BackMember() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} className="flex items-center gap-2">
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
}
