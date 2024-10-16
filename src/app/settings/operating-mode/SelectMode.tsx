import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Mode} from '@/utils/schemas/application';

type SelectModeProps = {
    selectedMode: string | null;
    onSelectChange: (value: string) => void;
};

export const SelectMode = ({selectedMode, onSelectChange}: SelectModeProps) => (
    <div className="mb-4">
        <Select value={selectedMode || undefined} onValueChange={onSelectChange}>
            <SelectTrigger className="w-[190px]">
                <SelectValue>{selectedMode}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {Object.entries(Mode).map(([key, label]) => (
                    <SelectItem key={key} value={label}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);
