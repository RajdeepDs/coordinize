import Link from "next/link";
import { useParams } from "next/navigation";

import { getTeamNavigation } from "@/config/team-navigation";
import { Button } from "@coordinize/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@coordinize/ui/components/dropdown-menu";
import { Icons } from "@coordinize/ui/lib/icons";

export function RowActions({ identifier }: { identifier: string }) {
  const params = useParams<{ slug: string }>();

  const options = getTeamNavigation(identifier, params.slug);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item"
          >
            <Icons.ellipsis size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {options.map((option) => {
            const Icon = Icons[option.icon as keyof typeof Icons];
            return (
              <DropdownMenuItem
                asChild
                key={option.label}
                className="cursor-pointer"
              >
                <Link href={option.href}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{option.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
