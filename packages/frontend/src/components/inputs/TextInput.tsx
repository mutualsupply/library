import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "utils";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";

interface TextInputProps
	extends Pick<InputHTMLAttributes<HTMLInputElement>, "type">,
		Pick<InputProps, "size" | "variant"> {
	name: string;
	label?: string;
	placeholder?: string;
	description?: string;
}

const TextInput = ({
	name,
	label,
	placeholder,
	description,
	type = "text",
	size,
	variant,
}: TextInputProps) => {
	const form = useFormContext();
	const error = form.formState.errors[name];
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{(label || description) && (
						<div>
							{label && <FormLabel>{label}</FormLabel>}
							{description && <FormDescription>{description}</FormDescription>}
						</div>
					)}
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							size={size}
							variant={variant}
							className={cn(error && "border-red")}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default TextInput;
