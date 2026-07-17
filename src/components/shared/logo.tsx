import { SquaresUnite } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <SquaresUnite className="text-primary" />
      <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
        EduCore
      </span>
    </Link>
  );
}
