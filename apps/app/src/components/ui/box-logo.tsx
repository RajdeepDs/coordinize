import { cn } from '@coordinize/ui/lib/utils';

interface LogoProps {
  className?: string;
}

export function BoxLogo({ className }: LogoProps) {
  return (
    <svg
      aria-labelledby="coordinizeLogo"
      className={cn('text-foreground', className)}
      fill="none"
      height="400"
      viewBox="0 0 400 400"
      width="400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="coordinizeLogo">Coordinize Logo</title>
      <path
        d="M0 0H400V400H0V0Z"
        fill="currentcolor"
        style={{ fill: 'currentcolor', fillOpacity: 1 }}
      />
      <path
        className="fill-white dark:fill-black"
        clipRule="evenodd"
        d="M313 98H201.597L147.152 152.303V124.811L87 184.818V244.186H143.353V301H256.675L313 241.632L147.152 241.005V156.091H313V98Z"
        fill="currentcolor"
        fillRule="evenodd"
      />
    </svg>
  );
}
