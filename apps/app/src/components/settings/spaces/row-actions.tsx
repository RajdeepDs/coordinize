import { Button } from "@coordinize/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@coordinize/ui/components/dropdown-menu";
import { Icons } from "@coordinize/ui/lib/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSpaceNavigation } from "@/config/team-navigation";

export function RowActions({ identifier }: { identifier: string }) {
  const params = useParams<{ slug: string }>();

  const options = getSpaceNavigation(identifier, params.slug);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            aria-label="Edit item"
            className="shadow-none"
            size="icon"
            variant="ghost"
          >
            <Icons.ellipsis aria-hidden="true" size={16} />
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
                className="cursor-pointer"
                key={option.label}
              >
                <Link href={option.href}>
                  <Icon aria-hidden="true" size={16} />
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
