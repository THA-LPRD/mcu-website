import * as React from "react"
import {usePathname} from 'next/navigation';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu"
import {cn} from "@/lib/utils"

interface LinkProps extends NextLinkProps {
    children: React.ReactNode;
}

import ThemeSelector from '@/components/ui/ThemeSelector';
import LanguageSelector from './ui/LanguageSelector';
import RestartButton from './ui/RestartButton';

const Link: React.FC<LinkProps> = ({href, ...props}) => {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === href : pathname.startsWith(href.toString());


    return (
        <NavigationMenuLink asChild active={isActive} className={cn(
            navigationMenuTriggerStyle(),
            "!rounded-none !flex flex-1 !w-full",
            isActive ? '!bg-accent text-accent-foreground' : 'bg-muted'
        )}>
            <NextLink href={href} className="NavigationMenuLink" {...props} />
        </NavigationMenuLink>
    );
};

export default function Navbar() {

    const pathname = usePathname();
    const isActive = (href: string) => {
        return pathname === href
    };

    return (
        <header className="pb-2 bg-muted">
            {/* Top Section: Name and Switches */}
            <div className="w-full flex justify-between items-center">
                {/* Left Side: Website Name */}
                <div className="text-2xl font-bold ml-1">LPRD</div>

                {/* Right Side: Switches (Language, Theme, Restart) */}
                <div className="flex items-center space-x-4">
                    <LanguageSelector/>
                    <ThemeSelector/>
                    <RestartButton/>
                </div>
            </div>

            {/* Bottom Section: Navigation Links */}
            <NavigationMenu className="!max-w-full !block">
                <NavigationMenuList>
                    <NavigationMenuItem
                        className={cn("flex-1", isActive('/') ? 'bg-accent text-accent-foreground' : 'bg-muted')}>
                        <Link href="/">Home</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem
                        className={cn("flex-1", isActive('/upload') ? 'bg-accent text-accent-foreground' : 'bg-muted')}>
                        <Link href="/upload">Image Upload</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem
                        className={cn("flex-1", isActive('/settings') ? 'bg-accent text-accent-foreground' : 'bg-muted')}>
                        <Link href="/settings">Settings</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
