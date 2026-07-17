import Header from "@/components/layout/header/header";
import HeaderMobile from "@/components/layout/header/header-mobile";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <HeaderMobile />
      <main>{children}</main>
    </>
  );
}
