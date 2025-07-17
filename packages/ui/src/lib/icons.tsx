import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  ArrowRight,
  Bell,
  BellDot,
  Bold,
  BookOpen,
  Calendar,
  CaseSensitive,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleAlert,
  CircleXIcon,
  Code,
  Code2,
  Command,
  CreditCard,
  Ellipsis,
  FilePenLine,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  Home,
  Inbox,
  Italic,
  Keyboard,
  Link,
  Link2,
  List,
  ListOrdered,
  ListTodo,
  Loader2Icon,
  Lock,
  Mail,
  Maximize2,
  Monitor,
  Pen,
  Pin,
  PinOff,
  Plus,
  Quote,
  Search,
  Send,
  Settings,
  ShieldUser,
  SmilePlus,
  Star,
  Strikethrough,
  Tent,
  Trash,
  Underline,
  UserCircle2,
  UserSquare2,
  Users,
  Users2,
  X,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  x: X,
  ChevronRight,
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
  maximize: Maximize2,
  pen: Pen,
  space: Tent,
  dragHandle: GripVertical,
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strike: Strikethrough,
  quote: Quote,
  inlineCode: Code,
  codeBlock: Code2,
  bulletList: List,
  numberedList: ListOrdered,
  checkList: ListTodo,
  check: Check,
  regularText: CaseSensitive,
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  draft: FilePenLine,
  resolve: CheckCircle2,
  link: Link,
  link2: Link2,
  pin: Pin,
  pinOff: PinOff,
  share: Send,
  trash: Trash,
  megaphone: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      fill="none"
      height="15"
      viewBox="0 0 14 15"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.1641 9.83327C13.2686 9.83327 14.1641 8.93787 14.1641 7.83327C14.1641 6.72871 13.2686 5.83329 12.1641 5.83329M8.38362 12.6666C8.10909 13.4434 7.36822 13.9999 6.49742 13.9999C5.39285 13.9999 4.49742 13.1045 4.49742 11.9999V10.9999M4.49888 4.66662V10.9999M12.1641 4.1404V11.5262C12.1641 12.4238 11.2951 13.065 10.4374 12.8001L2.77074 10.433C2.2119 10.2605 1.83075 9.74393 1.83075 9.15907V6.50753C1.83075 5.92267 2.2119 5.40608 2.77074 5.23353L10.4374 2.86641C11.2951 2.6016 12.1641 3.24279 12.1641 4.1404Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  ),
  help: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.00004 9.66665V9.65998M5.50004 5.16665C5.50004 4.61436 5.94777 4.16665 6.50004 4.16665H7.30584C7.96537 4.16665 8.50004 4.70131 8.50004 5.36086C8.50004 5.76011 8.30051 6.13305 7.96824 6.35451L7.59377 6.60418C7.22284 6.85145 7.00004 7.26778 7.00004 7.71358V7.83331M7.00004 13.1666C10.4058 13.1666 13.1667 10.4057 13.1667 6.99998C13.1667 3.59423 10.4058 0.833313 7.00004 0.833313C3.59429 0.833313 0.833374 3.59423 0.833374 6.99998C0.833374 10.4057 3.59429 13.1666 7.00004 13.1666ZM7.16671 9.66665C7.16671 9.75871 7.09211 9.83331 7.00004 9.83331C6.90797 9.83331 6.83337 9.75871 6.83337 9.66665C6.83337 9.57458 6.90797 9.49998 7.00004 9.49998C7.09211 9.49998 7.16671 9.57458 7.16671 9.66665Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  ),
  panelLeft: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.33333 10.6667V3.33333M4.2 1H9.8C10.9201 1 11.4801 1 11.908 1.21799C12.2843 1.40973 12.5903 1.71569 12.782 2.09202C13 2.51984 13 3.07989 13 4.2V9.8C13 10.9201 13 11.4801 12.782 11.908C12.5903 12.2843 12.2843 12.5903 11.908 12.782C11.4801 13 10.9201 13 9.8 13H4.2C3.07989 13 2.51984 13 2.09202 12.782C1.71569 12.5903 1.40973 12.2843 1.21799 11.908C1 11.4801 1 10.9201 1 9.8V4.2C1 3.07989 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.07989 1 4.2 1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  ),
  panelRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6667 10.6667V3.33333M9.8 1H4.2C3.07987 1 2.51987 1 2.092 1.21799C1.71567 1.40973 1.40973 1.71569 1.218 2.09202C0.999999 2.51984 1 3.07989 1 4.2V9.8C1 10.9201 0.999999 11.4801 1.218 11.908C1.40973 12.2843 1.71567 12.5903 2.092 12.782C2.51987 13 3.07987 13 4.2 13H9.8C10.9201 13 11.4802 13 11.908 12.782C12.2843 12.5903 12.5903 12.2843 12.782 11.908C13 11.4801 13 10.9201 13 9.8V4.2C13 3.07989 13 2.51984 12.782 2.09202C12.5903 1.71569 12.2843 1.40973 11.908 1.21799C11.4802 1 10.9201 1 9.8 1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  ),
};
