import type { LucideIcon } from "lucide-react";
import {
  BellDot,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Command,
  CreditCard,
  Dot,
  Home,
  Keyboard,
  Loader2Icon,
  Monitor,
  Moon,
  ShieldUser,
  Sun,
  UserCircle2,
  UserSquare2,
  Users2,
  X,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  x: X,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  loader: Loader2Icon,
  home: Home,
  userCircle: UserCircle2,
  bellDot: BellDot,
  sheildUser: ShieldUser,
  command: Command,
  users: Users2,
  userSquare: UserSquare2,
  creditCard: CreditCard,
  // biome-ignore lint/suspicious/noExplicitAny: Explicit any is required for dynamic props
  help: (props: any) => (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.99998 10.1667V10.16M5.49998 5.66668C5.49998 5.11439 5.94771 4.66668 6.49998 4.66668H7.30578C7.96531 4.66668 8.49998 5.20134 8.49998 5.86089C8.49998 6.26014 8.30045 6.63308 7.96818 6.85454L7.59371 7.10421C7.22278 7.35148 6.99998 7.76781 6.99998 8.21361V8.33334M6.99998 13.6667C10.4057 13.6667 13.1666 10.9057 13.1666 7.50001C13.1666 4.09426 10.4057 1.33334 6.99998 1.33334C3.59423 1.33334 0.833313 4.09426 0.833313 7.50001C0.833313 10.9057 3.59423 13.6667 6.99998 13.6667ZM7.16665 10.1667C7.16665 10.2587 7.09205 10.3333 6.99998 10.3333C6.90791 10.3333 6.83331 10.2587 6.83331 10.1667C6.83331 10.0746 6.90791 10 6.99998 10C7.09205 10 7.16665 10.0746 7.16665 10.1667Z"
        stroke="#666666"
        style={{ stroke: "#666666" }}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  circleAlert: CircleAlert,
  bookOpen: BookOpen,
  keyboard: Keyboard,
  calendar: Calendar,
  dot: Dot,
  monitor: Monitor,
  sun: Sun,
  moon: Moon,
};
