import Link from "next/link";
import { SquaresUnite } from "lucide-react";
import SidebarRoutes from "./sidebar-routes";

export default function Sidebar() {
  return (
    <aside className="group hidden md:flex h-screen w-20 hover:w-64 flex-col overflow-hidden bg-sidebar-foreground transition-[width] duration-300">
      <div className="flex h-16 items-center px-7">
        <Link href="/" className="flex items-center">
          <SquaresUnite className="size-6 shrink-0 text-primary" />

          <span className="ml-3 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-50 group-hover:opacity-100 font-display text-xl font-bold text-white">
            EduCore
          </span>
        </Link>
      </div>

      <SidebarRoutes />
    </aside>
  );
}
