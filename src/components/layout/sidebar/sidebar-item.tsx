"use client";

import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  exact?: boolean;
  mobile?: boolean;
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
  exact,
  mobile = false,
}: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  const link = (
    <Link
      href={href}
      className={cn(
        "relative flex h-12 items-center px-7 text-foreground transition-colors hover:bg-white/5 md:text-white",
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      )}

      <Icon className="size-5 shrink-0" />

      <span
        className={cn(
          "ml-3 whitespace-nowrap text-sm font-medium text-foreground md:text-white",
          "max-w-40 opacity-100",
          "md:max-w-0 md:overflow-hidden md:opacity-0",
          "md:transition-all md:duration-300",
          "md:group-hover:max-w-40 md:group-hover:opacity-100",
        )}
      >
        {label}
      </span>
    </Link>
  );

  return mobile ? <SheetClose asChild>{link}</SheetClose> : link;
}
