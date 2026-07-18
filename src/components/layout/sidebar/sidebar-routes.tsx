"use client";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart,
  Settings,
} from "lucide-react";

import SidebarItem from "./sidebar-item";

export const SIDEBAR_LINKS = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/instructor",
    exact: true,
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    icon: Users,
    label: "Students",
    href: "/instructor/students",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/instructor/analytics",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

interface SidebarRoutesProps {
  mobile?: boolean;
}

export default function SidebarRoutes({ mobile }: SidebarRoutesProps) {
  return (
    <nav className="flex flex-col">
      {SIDEBAR_LINKS.map((route) => (
        <SidebarItem key={route.href} {...route} mobile={mobile} />
      ))}
    </nav>
  );
}
