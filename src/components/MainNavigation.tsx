'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

import { Icons } from './Icons'

type MenuItem = {
  title: string
  href: string
  icon?: React.ReactNode
  items?: MenuItem[]
  description?: string
}

const mainMenuItems: MenuItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: <Icons.Home className="size-4" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Icons.Settings className="size-4" />,
  },
]

export default function MainNavigation() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {mainMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.items ? (
              <>
                <NavigationMenuTrigger className="flex flex-row items-center gap-2">
                  {item.icon}
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-2">
                    {item.items.map((subItem) => (
                      <li key={subItem.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={subItem.href}
                            className={cn(
                              'hover:bg-accent flex items-center gap-2 rounded-md p-3',
                              pathname === subItem.href && 'bg-accent/50'
                            )}
                          >
                            {subItem.icon}
                            <div className="ml-2">
                              <div className="font-medium">{subItem.title}</div>
                              {subItem.description && (
                                <p className="text-muted-foreground text-xs">{subItem.description}</p>
                              )}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'flex flex-row items-center gap-2',
                    pathname === item.href && 'bg-accent/50'
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
