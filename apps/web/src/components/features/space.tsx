import { Icons } from '@coordinize/ui/lib/icons';

const title = 'Organized by spaces';
const subtitle = 'Keep posts grouped by topic, project, or team.';

const spaces = [
  {
    id: 1,
    name: 'Getting Started',
    icon: '⚡',
  },
  {
    id: 2,
    name: 'Engineering',
    icon: '⚒️',
  },
  {
    id: 3,
    name: 'Product',
    icon: '💡',
  },
];

export function SpaceSection() {
  return (
    <div className="mx-auto flex flex-col gap-8 sm:container sm:text-center">
      {/* Illustration of space */}
      <div className="mask-b-from-70% mask-b-to-95% mx-auto w-xs select-none space-y-4">
        <div className="flex items-center justify-between text-ui-gray-900">
          <p className="text-sm">Spaces</p>
          <Icons.chevronDown size={16} />
        </div>
        <ul aria-label="Spaces" className="space-y-1">
          {spaces.map((space) => (
            <li
              className="flex h-9 items-center gap-2 rounded-md border bg-background px-3"
              key={space.id}
            >
              <span aria-hidden="true">{space.icon}</span>
              <span className="text-base">{space.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-1">
        <h1 className="font-medium text-lg">{title}</h1>
        <p className="text-ui-gray-900">{subtitle}</p>
      </div>
    </div>
  );
}
