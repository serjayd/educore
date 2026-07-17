import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
}

export default function NavItem({ label, href }: NavItemProps) {
  return (
    <Link
      href={href}
      className="text-base md:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
    </Link>
  );
}
