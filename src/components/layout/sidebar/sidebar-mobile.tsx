"use client";

import Container from "@/components/shared/container";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SidebarRoutes from "./sidebar-routes";

export default function SidebarMobile() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background md:hidden">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 p-0"
              showCloseButton={false}
            >
              <div className="py-4">
                <SidebarRoutes mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
