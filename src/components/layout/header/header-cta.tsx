import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeaderCTA() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
      <Button variant="outline" size="lg" asChild>
        <Link href="/sign-in" className="w-full md:w-fit">
          Sign In
        </Link>
      </Button>
      <Button variant="default" size="lg" asChild>
        <Link href="/sign-up" className="w-full md:w-fit">
          Get Started
        </Link>
      </Button>
    </div>
  );
}
