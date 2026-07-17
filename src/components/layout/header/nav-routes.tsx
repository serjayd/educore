import NavItem from "./nav-item";

export const NAV_LINKS = [
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Categories",
    href: "#categories",
  },
  {
    label: "Teach",
    href: "/teach",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
];

export default function NavRoutes() {
  return (
    <nav className="flex-1 md:flex-0">
      <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        {NAV_LINKS.map((route) => (
          <NavItem key={route.href} label={route.label} href={route.href} />
        ))}
      </ul>
    </nav>
  );
}
