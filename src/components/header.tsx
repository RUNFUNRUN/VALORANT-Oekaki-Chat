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

const anton = Anton({ weight: '400', subsets: ['latin'] });
const lobstar = Lobster({ weight: '400', subsets: ['latin'] });

export const Header = () => {
  return (
    <header>
      <div className='container flex py-4'>
        <h1 className={cn(anton.className, 'font-bold text-4xl')}>
          VALORANT Oekaki Chat
        </h1>
        <p className={`text-2xl ${lobstar.className} mt-auto ml-4 mr-auto`}>
          &quot;Oekaki&quot; means &quot;drawing&quot; in Japanese.
        </p>
        <NavigationMenu className='font-bold'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href='/posts' legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'text-lg font-bold',
                  )}
                >
                  Community
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <ToggleTheme />
        </div>
      </div>
      <Separator />
    </header>
  );
};
