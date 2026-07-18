import Container from "@/components/shared/container";
import Logo from "@/components/shared/logo";
import NavRoutes from "./nav-routes";
import HeaderCTA from "./header-cta";
import { IUserSession } from "@/types/user";

interface HeaderCTAProps {
  session: IUserSession | null;
}

export default function Header({ session }: HeaderCTAProps) {
  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 border-b border-border bg-background z-50">
      <Container>
        <div className="h-16 hidden md:flex items-center justify-between">
          <Logo />
          <NavRoutes />
          <HeaderCTA session={session} />
        </div>
      </Container>
    </header>
  );
}
