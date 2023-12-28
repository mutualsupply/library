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
					onClick={() => onClick?.(item.key)}
					className={cn("min-w-min", {
						[cn("bg-black", "text-white", "border-transparent")]:
							selected?.includes(item.key),
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
					className="px-4 inline-flex items-center gap-1"
				>
					<Close className="h-3" />
					<span
						className={cn("lowercase", "font-aspecta", "text-sm", "leading-5")}
					>
						clear
					</span>
				</Button>
			)}
		</div>
	);
}
