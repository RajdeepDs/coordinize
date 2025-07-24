import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  ArrowRight,
  Atom,
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
  Clipboard,
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
  ListFilter,
  ListOrdered,
  ListTodo,
  Loader2Icon,
  Lock,
  Mail,
  Maximize2,
  Monitor, Pencil,
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
  StarOff,
  Strikethrough,
  Tent,
  Trash,
  Underline,
  UserCircle2,
  UserSquare2,
  Users,
  Users2,
  X
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
  starOff: StarOff,
  maximize: Maximize2,
  pen: Pencil,
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
  post: Atom,
  clipboard: Clipboard,
  listFilter: ListFilter,
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
  github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X (Twitter)</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  google: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14.9933 8.27504C14.9933 7.68802 14.9456 7.25966 14.8426 6.81543H8.1394V9.46493H12.074C11.9947 10.1234 11.5663 11.115 10.6144 11.7813L10.6011 11.87L12.7205 13.5119L12.8673 13.5265C14.2158 12.2811 14.9933 10.4486 14.9933 8.27504Z" fill='currentColor'></path>
      <path d="M8.1394 15.2557C10.067 15.2557 11.6853 14.6211 12.8673 13.5264L10.6144 11.7812C10.0115 12.2016 9.20237 12.4951 8.1394 12.4951C6.25143 12.4951 4.64903 11.2497 4.07782 9.52832L3.99409 9.53543L1.79029 11.241L1.76147 11.3211C2.93551 13.6533 5.34706 15.2557 8.1394 15.2557Z" fill='currentColor'></path>
      <path d="M4.07787 9.52856C3.92715 9.08434 3.83992 8.60834 3.83992 8.11653C3.83992 7.62467 3.92715 7.14873 4.06994 6.7045L4.06595 6.60989L1.83453 4.87695L1.76152 4.91168C1.27765 5.87948 1 6.96629 1 8.11653C1 9.26677 1.27765 10.3535 1.76152 11.3213L4.07787 9.52856Z" fill='currentColor'></path>
      <path d="M8.1394 3.73713C9.48001 3.73713 10.3843 4.31622 10.9 4.80015L12.9149 2.83282C11.6774 1.68258 10.067 0.976562 8.1394 0.976562C5.34706 0.976562 2.93551 2.57896 1.76147 4.91116L4.06989 6.70398C4.64903 4.98259 6.25143 3.73713 8.1394 3.73713Z" fill='currentColor'></path>
    </svg>
  )
};
