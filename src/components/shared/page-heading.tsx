interface PageHeadingProps {
  title: string;
  subtitle?: string;
}

export default function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <div className="flex flex-col">
      <h1 className="font-display text-2xl font-extrabold text-foreground">
        {title}
      </h1>
      <p className="mt-1 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
