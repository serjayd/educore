import { Button } from "@/components/ui/button";
import { IUserSession } from "@/types/user";
import Link from "next/link";

interface HeaderCTAProps {
  session: IUserSession | null;
}

export default function HeaderCTA({ session }: HeaderCTAProps) {
  return (
    <>
      {!session ? (
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
      ) : (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <Button variant="ghost" size="lg" asChild>
            <Link href="/instructor" className="w-full md:w-fit">
              Instructor
            </Link>
          </Button>
          <Button variant="default" size="lg" asChild>
            <Link href="/my-courses" className="w-full md:w-fit">
              My Learning
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
