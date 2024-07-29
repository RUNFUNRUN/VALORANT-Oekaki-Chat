import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Lobster } from 'next/font/google';
import { Anton } from 'next/font/google';
import Link from 'next/link';
import { ToggleTheme } from './toggle-theme';
import { UserButton } from './user-button';

const anton = Anton({ weight: '400', subsets: ['latin'] });
const lobstar = Lobster({ weight: '400', subsets: ['latin'] });

export const Header = () => {
  const navItems: {
    title: string;
    path: string;
  }[] = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Community',
      path: '/community',
    },
  ];

  return (
    <header>
      <div className='container flex py-4'>
        <Link href='/'>
          <h1 className={cn(anton.className, 'font-bold text-4xl')}>
            VALORANT Oekaki Chat
          </h1>
        </Link>
        <p className={`text-2xl ${lobstar.className} mt-auto ml-4 mr-auto`}>
          &quot;Oekaki&quot; means &quot;drawing&quot; in Japanese.
        </p>
        <div className='flex gap-4'>
          <NavigationMenu className='font-bold'>
            <NavigationMenuList>
              <NavigationMenuItem>
                {navItems.map((navItem) => {
                  return (
                    <Link
                      href={navItem.path}
                      legacyBehavior
                      passHref
                      key={navItem.path}
                    >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'text-lg font-bold',
                        )}
                      >
                        {navItem.title}
                      </NavigationMenuLink>
                    </Link>
                  );
                })}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <UserButton />
          <ToggleTheme />
        </div>
      </div>
      <Separator />
    </header>
  );
};
