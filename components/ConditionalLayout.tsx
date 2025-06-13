

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // ✅ Ensures this only renders after client hydration
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Prevent mismatches during initial server render
    return null;
  }
  const isStandalonePage =
    pathname === "/" ||
    pathname === "/signup" ||
    pathname === "/signup2" ||
    pathname === "/signup3" ||
    pathname.startsWith("/memberUsers/") ||
    pathname === "/attendanceOfficers" ||
    pathname.startsWith("/attendanceOfficers/");

  if (isStandalonePage) {
    return <main className="w-full min-h-screen">{children}</main>;
  }

  // Render layout with sidebar and triggers
  return (
    <div className="flex w-full min-h-screen">
      <AppSidebar />
      <main className="flex-1 w-full">
        <SidebarTrigger />
        <ModeToggle />
        {children}
      </main>
    </div>
  );
}
