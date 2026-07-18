import Header from "@/components/layout/header/header";
import HeaderMobile from "@/components/layout/header/header-mobile";
import { getSession } from "@/lib/session";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const session = await getSession();

  return (
    <>
      <Header session={session} />
      <HeaderMobile session={session} />
      <main>{children}</main>
    </>
  );
}
