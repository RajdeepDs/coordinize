import { Badge } from "@coordinize/ui/badge";

import { formatDate } from "@/utils/format-date";

type ResolvedPostLabelProps = {
  userName: string;
  resolvedAt: Date;
};

export function ResolvedPostLabel({
  userName,
  resolvedAt,
}: ResolvedPostLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge className="rounded-sm bg-ui-green-700 px-2 py-0.5 uppercase">
        Resolved
      </Badge>
      <div className="flex items-center gap-2 text-sm text-ui-gray-900">
        <span className="font-medium text-ui-gray-900">{userName}</span>
        <span className="text-ui-gray-800">{formatDate(resolvedAt)}</span>
      </div>
    </div>
  );
}
