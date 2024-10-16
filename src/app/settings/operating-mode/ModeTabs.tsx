import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ModeContent} from './ModeContent';
import {Mode} from '@/utils/schemas/application';

type ModeTabsProps = {
    activeTab: string | null;
    onTabChange: (value: string) => void;
    selectedMode: string | null;
};

export function ModeTabs({activeTab, onTabChange, selectedMode}: ModeTabsProps) {
    return (
        <Tabs value={activeTab || undefined} onValueChange={onTabChange} className="w-full">
            <TabsList className={`grid w-full grid-cols-3`}>
                {Object.entries(Mode).map(([key, label]) => (
                    <TabsTrigger key={key} value={label}>
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {Object.entries(Mode).map(([key, label]) => (
                <TabsContent key={key} value={label}>
                    <ModeContent mode={label} selectedMode={selectedMode}/>
                </TabsContent>
            ))}
        </Tabs>
    );
}
