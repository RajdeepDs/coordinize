import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellDot,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Command,
  CreditCard,
  Home,
  Keyboard,
  Loader2Icon,
  Mail,
  ShieldUser,
  UserCircle2,
  UserSquare2,
  Users2,
  X,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  x: X,
  ChevronRight: ChevronRight,
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
  arrowRight: ArrowRight,
  circleAlert: CircleAlert,
  bookOpen: BookOpen,
  keyboard: Keyboard,
  calendar: Calendar,
  mail: Mail,
  help: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.00004 9.66665V9.65998M5.50004 5.16665C5.50004 4.61436 5.94777 4.16665 6.50004 4.16665H7.30584C7.96537 4.16665 8.50004 4.70131 8.50004 5.36086C8.50004 5.76011 8.30051 6.13305 7.96824 6.35451L7.59377 6.60418C7.22284 6.85145 7.00004 7.26778 7.00004 7.71358V7.83331M7.00004 13.1666C10.4058 13.1666 13.1667 10.4057 13.1667 6.99998C13.1667 3.59423 10.4058 0.833313 7.00004 0.833313C3.59429 0.833313 0.833374 3.59423 0.833374 6.99998C0.833374 10.4057 3.59429 13.1666 7.00004 13.1666ZM7.16671 9.66665C7.16671 9.75871 7.09211 9.83331 7.00004 9.83331C6.90797 9.83331 6.83337 9.75871 6.83337 9.66665C6.83337 9.57458 6.90797 9.49998 7.00004 9.49998C7.09211 9.49998 7.16671 9.57458 7.16671 9.66665Z"
        stroke="#666666"
        style={{
          stroke: "#666666",
          strokeOpacity: 1,
        }}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
