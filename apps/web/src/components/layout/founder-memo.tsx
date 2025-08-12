import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@coordinize/ui/components/avatar';

const avatarSrc =
  'https://c0nwx4j17a.ufs.sh/f/WFTadyjmVJh2wKk9O55aLExDt78kHByCdQqiVMWhzjPNsu4O' as const;

export function FoundersMemo() {
  return (
    <div className="mx-4 mt-20 space-y-4 rounded-2xl bg-background p-4 text-ui-gray-900 ring ring-ui-gray-400 sm:p-12 md:mx-auto md:max-w-xl lg:max-w-5xl">
      <h1 className="font-medium text-foreground ">From the creator,</h1>
      <p>
        I built Coordinize because modern tools reward constant pings and
        instant replies — not thoughtful communication. I've seen great ideas
        buried in endless chat threads, and decisions vanish without context.
      </p>
      <p>
        Coordinize is an async-first space where posts have purpose, updates
        stay organized, and your team can work without the pressure to always be
        "online".
      </p>
      <p>
        This is just the beginning! I'm building it in public, learning from
        every conversation, and shaping it for teams who care about clarity over
        chaos.
      </p>
      <div className="mt-12 flex items-center gap-2">
        <Avatar className="size-9">
          <AvatarImage alt={'User Image'} src={avatarSrc} />
          <AvatarFallback className="select-none uppercase">A</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0 text-sm">
          <h1 className="font-medium text-base text-foreground">Rajdeep Das</h1>
          <p>Creator of Coordinize</p>
        </div>
      </div>
    </div>
  );
}
