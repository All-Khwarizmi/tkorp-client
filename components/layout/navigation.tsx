'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const routes = [
  {
    href: '/',
    label: 'Accueil',
  },
  {
    href: '/animals',
    label: 'Animaux',
  },
  {
    href: '/persons',
    label: 'Propriétaires',
  },
  {
    href: '/statistics',
    label: 'Statistiques',
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="m-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Pet Management</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === route.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
