"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Folder,
  Users,
  Zap,
  Settings,
  LogOut,
  Container,
  MessageSquare,
} from "lucide-react";
import UserInfo from "./user-info";
import { CreatePlaygroundsDialogComponent } from "./create-playground";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export default function NavSidebar() {
  const [activeItem, setActiveItem] = useState("home");

  const router = useRouter();

  const pathName = usePathname() as string;

  const navItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: "Home",
      id: "home",
      link: "/dashboard",
    },
    {
      icon: <Container className="h-4 w-4" />,
      label: "Public Environments",
      id: "public-envs",
      link: "/public-envs",
    },
    {
      icon: <Folder className="h-4 w-4" />,
      label: "My Projects",
      id: "projects",
      link: "/projects",
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: "Learn",
      id: "learn",
      link: "/learn",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Teams",
      id: "teams",
      link: "/teams",
      disabled: true,
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Community",
      id: "community",
      link: "/community",
      disabled: true,
    },
  ];

  const NavItem = ({
    icon,
    label,
    id,
    link,
    disabled,
  }: {
    icon: React.ReactNode;
    label: string;
    link: string;
    id: string;
    disabled?: boolean;
  }) =>
    label === "Logout" ? (
      <SignOutButton>
        <Button
          variant={activeItem === id ? "secondary" : "ghost"}
          className={`w-full justify-start gap-2 font-medium`}
        >
          {icon}
          {label}
        </Button>
      </SignOutButton>
    ) : (
      <Button
        variant={activeItem === id ? "secondary" : "ghost"}
        className={`w-full justify-start gap-2 font-medium`}
        onClick={() => {
          router.push(link);
        }}
        disabled={disabled}
      >
        {icon}
        {label}
      </Button>
    );

  useEffect(() => {
    setActiveItem(
      navItems.filter((item) => item.link === pathName)[0]?.id as string,
    );
  }, []);

  return (
    <div className="flex h-screen w-56 flex-col gap-[3px] text-white">
      <UserInfo />
      <div className="flex h-full flex-col bg-[#111]">
        <div className="border-b border-gray-800 p-4">
          <CreatePlaygroundsDialogComponent />
        </div>
        <ScrollArea className="flex-grow">
          <div className="space-y-2 p-2">
            {navItems.map((navItem) => (
              <NavItem
                key={navItem.id}
                icon={navItem.icon}
                label={navItem.label}
                id={navItem.id}
                link={navItem.link}
                disabled={navItem.disabled}
              />
            ))}
          </div>
        </ScrollArea>
        <div className="space-y-2 border-t border-gray-800 p-2">
          <NavItem
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
            id="settings"
            link="/settings"
            disabled={true}
          />
          <NavItem
            icon={<LogOut className="h-4 w-4" />}
            label="Logout"
            id="logout"
            link=""
          />
        </div>
      </div>
    </div>
  );
}
