type SectionHeaderProps = {
  tagLine?: string;
  title: string;
  subtitle: string;
};

export function SectionHeader({
  tagLine,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="flex w-full flex-col items-start gap-2 text-start">
      {tagLine ? (
        <span className="text-muted-foreground text-sm tracking-wide">
          {tagLine}
        </span>
      ) : null}
      <h1 className="w-full max-w-2xl text-balance font-bold text-3xl leading-tight">
        {title}
      </h1>
      <p className="max-w-md font-medium text-base text-gray-900">{subtitle}</p>
    </div>
  );
}
