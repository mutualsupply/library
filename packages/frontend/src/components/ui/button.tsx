import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { useFormContext } from "react-hook-form";
import { cn } from "utils";
import Spinner from "../Spinner";
import OptimismLogo from "../icons/Optimism";

const buttonVariants = cva(
	"inline-flex items-center justify-center font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative text-base font-aspekta",
	{
		variants: {
			variant: {
				default: "bg-transparent text-primary border",
				outline:
					// @note -- ask about focus state here -- do we want font-medium?
					"border border-black border-dashed bg-transparent rounded-none p-1 hover:border-primary hover:text-primary",
				blueOutline:
					"border border-primary border-dashed bg-white text-primary",
				blackOutline: "border border-black border-solid  text-black",
				link: "text-black underline-offset-4 underline",
				op: "text-black border border-dashed border-red bg-background hover:border-solid hover:text-red",
				purple: "rounded-sm text-purple border-solid border-purple border",
			},
			size: {
				default: "h-9 px-4 py-3 rounded-sm min-w-[128px]",
				lg: "h-12 rounded-2xl px-8",
				pill: "rounded-full px-2 py-0.5 leading-6",
				icon: "px-1 py-1 w-6",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends Pick<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			"className" | "type" | "children" | "disabled" | "onClick"
		>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, loading, children, type = "button", ...props },
		ref,
	) => {
		return (
			<button
				{...props}
				className={cn(buttonVariants({ variant, size }), className)}
				disabled={loading || props.disabled}
				ref={ref}
				type={type}
			>
				<>
					{loading && (
						<div className="absolute inset-0 flex justify-center align-items-center">
							<Spinner />
						</div>
					)}
					{children}
				</>
			</button>
		);
	},
);
Button.displayName = "Button";

const Submit = React.forwardRef<
	HTMLButtonElement,
	Exclude<ButtonProps, "type">
>(({ children, ...props }, ref) => {
	const { formState } = useFormContext();
	const isLoading = formState.isSubmitting || formState.isValidating;
	return (
		<Button
			ref={ref}
			type="submit"
			disabled={isLoading}
			loading={isLoading}
			{...props}
		>
			{children ? children : "Submit"}
		</Button>
	);
});
Submit.displayName = "Submit";

const OPButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, ...props }, ref) => {
		return (
			<Button ref={ref} variant="op" size="pill" {...props}>
				<span className="inline-flex items-center gap-2 w-full">
					<OptimismLogo />
					<span className="text-xs font-aspekta font-medium">
						{children ? children : "Earn $OP for your thoughts"}
					</span>
				</span>
			</Button>
		);
	},
);
Submit.displayName = "Submit";

export { Button, OPButton, Submit, buttonVariants };
