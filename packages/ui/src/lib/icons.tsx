import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ArrowRight,
  Bell,
  BellDot,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleAlert,
  CircleXIcon,
  Command,
  CreditCard,
  Ellipsis,
  Home,
  Inbox,
  Keyboard,
  Loader2Icon,
  Lock,
  Mail,
  Monitor,
  Plus,
  Search,
  Settings,
  ShieldUser,
  SmilePlus,
  Star,
  UserCircle2,
  UserSquare2,
  Users,
  Users2,
  X,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  x: X,
  ChevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronUpDown: ChevronsUpDown,
  chevronDown: ChevronDown,
  loader: Loader2Icon,
  home: Home,
  userCircle: UserCircle2,
  bellDot: BellDot,
  bell: Bell,
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
  lock: Lock,
  monitor: Monitor,
  search: Search,
  circleX: CircleXIcon,
  ellipsis: Ellipsis,
  settings: Settings,
  members: Users,
  emojiPlus: SmilePlus,
  archive: Archive,
  plus: Plus,
  inbox: Inbox,
  star: Star,
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
  panelRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6667 11.6667V4.33333M10.8 2H5.2C4.07987 2 3.51987 2 3.092 2.21799C2.71567 2.40973 2.40973 2.71569 2.218 3.09202C2 3.51984 2 4.07989 2 5.2V10.8C2 11.9201 2 12.4801 2.218 12.908C2.40973 13.2843 2.71567 13.5903 3.092 13.782C3.51987 14 4.07987 14 5.2 14H10.8C11.9201 14 12.4802 14 12.908 13.782C13.2843 13.5903 13.5903 13.2843 13.782 12.908C14 12.4801 14 11.9201 14 10.8V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2Z"
        stroke="#666666"
        style={{
          stroke: "#666666",
          strokeOpacity: 1,
        }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
