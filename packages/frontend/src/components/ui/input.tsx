import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "utils";

const inputVariants = cva("flex w-full font-aspekta text-base text-primary", {
	variants: {
		variant: {
			default:
				"border border-input bg-transparent px-4 py-3 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-sm border-dashed",
			solid:
				"border border-primary bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-solid",
		},
		size: {
			default: "h-9",
			lg: "h-12 px-4 py-3",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	leftOfInput?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, type, variant, size, leftOfInput, children, ...props },
		ref,
	) => {
		return (
			<span className={cn("relative")}>
				{leftOfInput && (
					<span className={cn("absolute left-3 top-1/2 -translate-y-1/2")}>
						{leftOfInput}
					</span>
				)}
				<input
					type={type}
					className={cn(inputVariants({ variant, size, className }), {
						"pl-10": !!leftOfInput,
					})}
					ref={ref}
					{...props}
				/>
			</span>
		);
	},
);
Input.displayName = "Input";

export { Input };
