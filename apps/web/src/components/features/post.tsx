import { Avatar, AvatarFallback, AvatarImage } from "@coordinize/ui/avatar";

const title = "Purpose-driven posts";
const subtitle = "Share updates and discuss ideas, on your schedule.";

const avatarSrc =
  "https://c0nwx4j17a.ufs.sh/f/WFTadyjmVJh2wKk9O55aLExDt78kHByCdQqiVMWhzjPNsu4O" as const;

const spaceName = "Getting Started" as const;
const postTitle = "Welcome to Coordinize" as const;
const postDescription =
  "Welcome abroad! You've just created your first workspace on Coordinize, the async-first communication platform designed" as const;

export function PostSection() {
  return (
    <div className="mx-auto flex flex-col gap-8 sm:container sm:text-center">
      {/* Illustration of Posts with stacked effect */}
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute top-2 right-4 left-4 h-14 rounded-lg border bg-background/50 blur-[0.5px]" />
        <div className="absolute top-1 right-2 left-2 h-14 rounded-lg border bg-background/70 blur-[0.25px]" />
        <div className="relative flex h-14 select-none items-center gap-3 rounded-lg border bg-background px-3">
          <Avatar className="size-8">
            <AvatarImage alt={"User Image"} src={avatarSrc} />
            <AvatarFallback className="select-none uppercase">A</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-0 text-start">
            <div className="flex min-w-0 select-none items-center gap-2">
              <h1 className="truncate font-medium text-[15px]">{postTitle}</h1>
              <span
                className={
                  "hidden size-1 flex-shrink-0 rounded-full bg-ui-gray-700 sm:flex"
                }
              />
              <p className="hidden truncate font-medium text-[15px] sm:flex">
                {spaceName}
              </p>
            </div>
            <p className="line-clamp-1 text-sm text-ui-gray-900">
              {postDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Metadata */}
      <div className="space-y-1">
        <h1 className="font-medium text-lg">{title}</h1>
        <p className="text-ui-gray-900">{subtitle}</p>
      </div>
    </div>
  );
}
