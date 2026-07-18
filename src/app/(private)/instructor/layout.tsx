import Sidebar from "@/components/layout/sidebar/sidebar";
import SidebarMobile from "@/components/layout/sidebar/sidebar-mobile";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <SidebarMobile />
      <main className="pt-20 md:pt-4 md:p-4 md:h-screen md:overflow-y-auto flex-1">
        {children}
      </main>
    </div>
  );
}
