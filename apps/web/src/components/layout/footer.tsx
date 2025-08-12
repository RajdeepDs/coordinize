import Link from 'next/link';
import { Logo } from '../logo';

export function Footer() {
  return (
    <footer className="border-t py-16">
      <div className="mx-auto grid grid-cols-3 gap-12 px-4 md:max-w-xl md:grid-cols-4 lg:max-w-5xl lg:grid-cols-6">
        <div className="col-span-2 md:col-span-3 lg:col-span-5">
          <Link href={'/'}>
            <Logo />
          </Link>
        </div>
        <div className="hidden flex-col gap-4 text-sm text-ui-gray-900">
          <h3 className="font-medium text-foreground">Product</h3>
          <div className="flex flex-col gap-1">
            <Link className="min-h-7 hover:text-foreground" href={'/blog'}>
              Blog
            </Link>
            <Link className="min-h-7 hover:text-foreground" href={'/changelog'}>
              Changelog
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm text-ui-gray-900">
          <h3 className="font-medium text-foreground">Connect</h3>
          <div className="flex flex-col gap-1">
            <Link
              className="min-h-7 hover:text-foreground"
              href={'https://x.com/Rajdeep__ds'}
              rel="noopener noreferrer"
              target="_blank"
            >
              X (Twitter)
            </Link>
            <Link
              className="min-h-7 hover:text-foreground"
              href={'https://github.com/RajdeepDs/coordinize'}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </Link>
            <Link
              className="min-h-7 hover:text-foreground"
              href="mailto:rajdeepds626@gmail.com"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
