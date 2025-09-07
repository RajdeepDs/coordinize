import { cn } from "@coordinize/ui/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      aria-labelledby="coordinizeLogo"
      className={cn("text-foreground dark:text-white", className)}
      fill="none"
      height="49"
      viewBox="0 0 48 49"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Logo</title>
      <path
        clipRule="evenodd"
        d="M48 0.5H24.3392L12.7756 13.34V6.83962L0 21.0283V35.066H11.9689V48.5H36.0372L48 34.4623L12.7756 34.314V14.2358H48V0.5Z"
        fill="currentcolor"
        fillRule="evenodd"
        style={{ fill: "currentcolor", fillOpacity: 1 }}
      />
    </svg>
  );
}
