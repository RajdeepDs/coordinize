import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@coordinize/ui/components/avatar';
import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';

const title = 'Catch up without the chaos';
const subtitle =
  'A single timeline for posts, comments, and changes — on your schedule.';

const avatarSrc =
  'https://c0nwx4j17a.ufs.sh/f/WFTadyjmVJh2wKk9O55aLExDt78kHByCdQqiVMWhzjPNsu4O' as const;

export function TimelineSection() {
  return (
    <div className="mx-auto flex flex-col gap-8 sm:container sm:text-center">
      {/* Illustration of timeline activity */}
      <div className="mask-b-from-50% mask-b-to-95% mask-r-from-50% mask-r-to-95% rounded-xl border p-1">
        <div className="rounded-[calc(var(--radius-xl)-(--spacing(1)))] border bg-background p-4">
          <div className="mb-4 flex items-start">
            <p className="font-medium text-sm">Activity</p>
          </div>
          <div className="relative space-y-3">
            <div className="absolute top-0 left-6 z-0 h-full w-px bg-ui-gray-400" />
            <div className="relative select-none bg-background pl-3">
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-6 items-center justify-center rounded-full bg-ui-gray-400">
                  <Icons.space className="text-ui-gray-900" size={16} />
                </div>
                <p className="font-medium text-sm">Rajdeep</p>
                <p className="truncate text-sm text-ui-gray-900">
                  move this post from Getting Started to Engineering
                </p>
                <span className="inline-block size-[3px] rounded-full bg-ui-gray-700 align-middle" />
                <span className="truncate text-sm text-ui-gray-900">
                  6d ago
                </span>
              </div>
            </div>
            <div className="relative w-full divide-y rounded-md border border-ui-gray-200 bg-background">
              <div className="group relative flex flex-col gap-y-2 p-3 ">
                <div className="flex select-none items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage alt={'User Image'} src={avatarSrc} />
                    <AvatarFallback className="select-none uppercase">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">Rajdeep</p>
                  <span className="text-sm text-ui-gray-900">24m ago</span>
                </div>
                <div className="prose prose-sm mb-3 max-w-none text-foreground">
                  <p className="text-start text-sm">
                    Just a quick update: I've arranged for maintenance to come
                    by tomorrow, July 19th. They'll also be on the lookout for
                    any eagles in the area!
                  </p>
                </div>
              </div>
              <div className="group relative flex flex-col gap-y-2 p-3 ">
                <div className="flex select-none items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage alt={'User Image'} src={''} />
                    <AvatarFallback className="select-none uppercase">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">Alex</p>
                  <span className="text-sm text-ui-gray-900">24m ago</span>
                </div>
                <div className="prose prose-sm mb-3 max-w-none text-foreground">
                  <p className="text-start text-sm">
                    Okay! we'll make sure to keep an eye out for any eagles.
                  </p>
                </div>
              </div>
              <div className="group relative flex items-center gap-x-2 p-3 ">
                <div className="flex select-none items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage alt={'User Image'} src={avatarSrc} />
                    <AvatarFallback className="select-none uppercase">
                      R
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="prose prose-sm max-w-none text-ui-gray-900">
                  <p className="text-start text-sm">Leave a reply...</p>
                </div>
                <Button
                  className={
                    'mt-auto ml-auto size-7 disabled:border disabled:border-ui-gray-500 disabled:bg-ui-gray-400 disabled:text-ui-gray-1000'
                  }
                  disabled
                  size="sm"
                  type="submit"
                  variant="default"
                >
                  <Icons.arrowUp />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Title and subtitle */}
      <div className="space-y-1">
        <h1 className="font-medium text-lg">{title}</h1>
        <p className="text-ui-gray-900">{subtitle}</p>
      </div>
    </div>
  );
}
