import {ControllerRenderProps, Path, FieldValues} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FormItem, FormLabel, FormMessage} from "@/components/ui/form";

type GenericEnumSelectProps<
    TFieldValues extends FieldValues,
    TName extends Path<TFieldValues>
> = {
    field: ControllerRenderProps<TFieldValues, TName>;
    label: string;
    enumObj: Record<string, string>;
    width?: string;
};

export function EnumSelect<
    TFieldValues extends FieldValues,
    TName extends Path<TFieldValues>
>({
      field,
      label,
      enumObj,
      width = "w-[180px]"
  }: GenericEnumSelectProps<TFieldValues, TName>) {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={width}>
                    <SelectValue>{field.value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {Object.values(enumObj).map((value) => (
                        <SelectItem key={value} value={value}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage/>
        </FormItem>
    );
}
