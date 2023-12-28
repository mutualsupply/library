import { cn } from "utils";
import Close from "./icons/Close";
import { Button } from "./ui/button";

interface LabelFilterProps {
	items: { key: string; name: string }[];
	selected?: string[];
	onClick?: (key: string) => void;
	onClearClick?: () => void;
}

export default function LabelFilter({
	items,
	selected,
	onClick,
	onClearClick,
}: LabelFilterProps) {
	return (
		<div className={cn("flex", "items-center", "flex-wrap", "gap-2")}>
			{items.map((item, index) => (
				<Button
					key={`label-${item.key}-${index}`}
					onClick={() => onClick?.(item.name)}
					className={cn("min-w-min", {
						[cn("bg-black", "text-white", "border-transparent")]:
							selected?.includes(item.name),
					})}
				>
					<span className={cn("font-spline text-xs")}>{item.name}</span>
				</Button>
			))}
			{selected && selected?.length > 0 && onClearClick && (
				<Button
					onClick={onClearClick}
					variant="outline"
					size="pill"
					className="px-3 py-1.5 inline-flex items-center gap-2 bg-background"
				>
					<Close className="h-2" />
					<span
						className={cn("lowercase", "font-spline", "text-sm", "leading-5")}
					>
						clear
					</span>
				</Button>
			)}
		</div>
	);
}
