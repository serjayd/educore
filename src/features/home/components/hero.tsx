import Container from "@/components/shared/container";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const COURSES = [
  {
    title: "Web Development",
    href: "/categories",
  },
  {
    title: "UI/UX Design",
    href: "/categories",
  },
  {
    title: "Data Science",
    href: "/categories",
  },
  {
    title: "Marketing",
    href: "/categories",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:flex md:min-h-screen md:items-center md:py-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <Sparkles className="size-4" />
              <span>10,000+ courses from expert instructors</span>
            </div>

            <div className="mb-8">
              <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Learn New Skills,
                <br />
                <span className="text-gradient">Teach What You Love.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                EduCore is the modern learning platform for high-quality
                courses, real progress tracking, and recognized certificates —
                whether you&apos;re here to learn or to teach.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="text"
                placeholder="What do you want to learn today?"
                className="h-12 pl-10"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-foreground">Popular:</span>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
                {COURSES.map((course) => (
                  <li key={course.title}>
                    <Link
                      href={course.href}
                      className="transition-colors hover:text-primary"
                    >
                      {course.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/hero.jpg"
              alt="Hero Banner"
              width={1280}
              height={1024}
              priority
              className="h-auto w-full max-w-xl rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
