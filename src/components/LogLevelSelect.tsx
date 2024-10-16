import { ControllerRenderProps } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LogLevel } from "@/utils/schemas/application";

interface LogLevelSelectProps {
    field: ControllerRenderProps<{ logLevel: LogLevel }, "logLevel">;
}

export function LogLevelSelect({ field }: LogLevelSelectProps) {
    return (
        <FormItem>
            <FormLabel>Log Level</FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue>{field.value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {Object.values(LogLevel).map((level) => (
                        <SelectItem key={level} value={level}>
                            {level}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
    );
}
