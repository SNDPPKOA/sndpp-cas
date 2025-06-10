"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { ViewProfileButton } from "./ui/viewProfileButton";
import { Logout } from "./ui/lougoutButton";

// Sidebar navigation data
const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboardUsers" },
    { title: "Members", url: "/memberUsers" },
  ],
};

type User = {
  lastName: string;
  firstName: string;
  memberStatus: string;
};

export function UserSideBar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
  }, []);

  return (
    <Sidebar {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex gap-2 items-center">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                    <Image
                      src="/casLogo.jpg"
                      alt="CAS Logo"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-semibold text-sm">SNDPP-CAS</span>
                    <span className="text-xs">Commission for Altar Server</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* User Info */}
          <SidebarMenuItem>
            <div className="flex flex-col justify-center items-center p-4 text-center">
              <Image
                className="rounded-full"
                src="/defaultProfile.png"
                alt="Profile"
                width={100}
                height={100}
                priority
              />
              <h1 className="font-semibold mt-2">
                {user ? `${user.lastName}, ${user.firstName}` : "Loading..."}
              </h1>
              <h4 className="text-sm">{user?.memberStatus || ""}</h4>
              <ViewProfileButton />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Menu Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>

       
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Buttons */}
      <Logout />
      <SidebarRail />
    </Sidebar>
  );
}
