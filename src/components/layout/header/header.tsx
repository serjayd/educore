import Container from "@/components/shared/container";
import Logo from "@/components/shared/logo";
import NavRoutes from "./nav-routes";
import HeaderCTA from "./header-cta";

export default function Header() {
  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 border-b border-border bg-background z-50">
      <Container>
        <div className="h-16 hidden md:flex items-center justify-between">
          <Logo />
          <NavRoutes />
          <HeaderCTA />
        </div>
      </Container>
    </header>
  );
}
