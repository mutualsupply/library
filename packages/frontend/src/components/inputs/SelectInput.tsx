import { Select } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface SelectItemI {
	key: string;
	name: string;
}

interface SelectInputProps {
	name: string;
	label?: string;
	placeholder?: string;
	description?: string;
	items: Array<SelectItemI>;
	defaultValue?: string;
}

const SelectInput = ({
	name,
	label,
	placeholder,
	description,
	items,
}: SelectInputProps) => {
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Select
							onValueChange={(value) => field.onChange(value)}
							value={field.value === "" ? undefined : field.value}
						>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent>
								{items.map((item) => (
									<SelectItem key={item.key} value={item.key}>
										{item.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SelectInput;
