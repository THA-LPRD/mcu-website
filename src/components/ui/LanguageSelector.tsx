import * as React from "react"
import {GlobeIcon} from '@radix-ui/react-icons';
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

export default function LanguageSelector() {

    const [, setLang] = React.useState('en');

    React.useEffect(() => {
        // Get language from localStorage or any other client-side API
        const savedLang = localStorage.getItem('lang') || 'en';
        setLang(savedLang);
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-muted border-muted">
                    <GlobeIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all"/>
                    <span className="sr-only">Change Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLang("en")}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("de")}>
                    Deutsch
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
