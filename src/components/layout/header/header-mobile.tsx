"use client";

import Container from "@/components/shared/container";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavRoutes from "./nav-routes";
import HeaderCTA from "./header-cta";

export default function HeaderMobile() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 border-b border-border bg-background z-50">
      <Container>
        <div className="h-16 flex items-center justify-between">
          <Logo />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="h-full mt-12 flex flex-col gap-8 p-4">
                <NavRoutes />
                <HeaderCTA />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
