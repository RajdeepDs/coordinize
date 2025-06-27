import { cn } from '@coordinize/ui/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      aria-labelledby="coordinizeLogo"
      className={cn('text-foreground dark:text-white', className)}
      fill="none"
      height="100"
      viewBox="0 0 98 100"
      width="98"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="coordinizeLogo">Coordinize Logo</title>
      <path
        d="M75.5 55C87.9264 55 98 65.0736 98 77.5C98 89.9264 87.9264 100 75.5 100C63.0736 100 53 89.9264 53 77.5C53 65.0736 63.0736 55 75.5 55ZM46.001 0.157227C48.203 -0.0167955 50 1.79101 50 4V96C49.9999 98.209 48.203 100.016 46.001 99.8418C20.2567 97.8043 6.24943e-05 76.2679 0 50C0 23.732 20.2567 2.19471 46.001 0.157227ZM75.5 0C87.9264 0 98 10.0736 98 22.5C98 34.9264 87.9264 45 75.5 45C63.0736 45 53 34.9264 53 22.5C53 10.0736 63.0736 0 75.5 0Z"
        fill="#171717"
        style={{
          fill: 'currentcolor',
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}
