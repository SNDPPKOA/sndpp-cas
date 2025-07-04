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
import { Logout } from "./ui/lougoutButton";

// Sidebar navigation data
const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Members", url: "/members" },
    { title: "Schedule", url: "/schedule" },
    {
      title: "Attendance",
      url: "/attendance",
      items: [{ title: "Inactive", url: "/inactive" }],
    },
    { title: "Birthday Celebrant", url: "/birthday" },
    { title: "Liturgical Objects", url: "/liturgicalObj" },
    { title: "Sacraments", url: "/sacraments" },
  ],
};

type User = {
  lastName: string;
  firstName: string;
  memberStatus: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
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

          {/* User Info Section */}
          <SidebarMenuItem>
            <div className="flex flex-col justify-center items-center h-[240px] p-4 text-center">
              <Image
                className="rounded-full"
                src="/defaultProfile.png"
                alt="Profile"
                width={100}
                height={100}
                priority
              />
              <h1 className="font-semibold mt-2">ADMIN</h1>
              <h4 className="text-sm">Commission for Altar Server</h4>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

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

                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Logout />
      <SidebarRail />
    </Sidebar>
  );
}
