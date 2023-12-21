import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "utils";

const inputVariants = cva("", {
	variants: {
		variant: {
			default:
				"font-aspecta flex w-full text-base border border-input bg-transparent px-4 py-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-sm border-dashed",
		},
		size: {
			default: "h-9",
			lg: "h-12",
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
	({ className, type, variant, size, leftOfInput, children, ...props }, ref) => {
		return (
			<span className={cn("inline-flex", "items-center")}>
				{leftOfInput && <span className={cn("absolute left-8")}>{leftOfInput}</span>}
				<input
					type={type}
					className={cn(inputVariants({ variant, size, className }), {"pl-12": !!leftOfInput})}
					ref={ref}
					{...props}
				/>
			</span>
		);
	},
);
Input.displayName = "Input";

export { Input };
