export function InboxItem() {
  return (
    // List of Inbox items
    <div className="flex px-1">
      {/* Inbox Item */}
      <div className="flex h-[55px] w-full items-center gap-2 rounded-sm p-2 transition-colors duration-150 ease-linear hover:bg-ui-gray-100">
        <div className="size-8 rounded-full bg-ui-gray-700" />
        <div className="flex-1 flex-col gap-1">
          <p className="text-sm">What we're working on?</p>
          <span className="text-sm text-ui-gray-900">
            Alex Chen commented on your post.
          </span>
        </div>
        <div className="flex h-full flex-col justify-end">
          <span className="text-sm text-ui-gray-800">4h</span>
        </div>
      </div>
    </div>
  );
}
