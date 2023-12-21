import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border text-sm font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-[#D1E8FA40] text-primary rounded-full px-2 hover:bg-primary hover:text-white",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props}>
			<span className="font-aspekta">{children}</span>
		</div>
	);
}

export { Badge, badgeVariants };
