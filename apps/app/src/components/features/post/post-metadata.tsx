import AvatarStatus from "@/components/ui/avatar-status";
import { formatDate } from "@/utils/format-date";

type PostMetadataProps = {
  userName: string;
  userImage: string;
  createdAt: Date;
};

export function PostMetadata({
  userName,
  userImage,
  createdAt,
}: PostMetadataProps) {
  return (
    <div className="flex items-center gap-2">
      <AvatarStatus
        alt="user-avatar"
        className="size-7"
        fallback={userName.charAt(0)}
        src={userImage}
      />
      <div className="flex items-center gap-2 text-sm text-ui-gray-900">
        <span className="font-medium text-primary">{userName}</span>
        <span>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}
