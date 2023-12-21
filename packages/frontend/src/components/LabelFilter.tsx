import { cn } from "utils";
import Close from "./icons/Close";
import { Button } from "./ui/button";

interface LabelFilterProps {
	items: { key: string; title: string }[];
	selected?: string[];
	onClick?: (key: any) => void;
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
					className={cn({
						[cn("bg-black", "text-white", "border-transparent")]:
							selected?.includes(item.key),
					})}
				>
					<span className={cn("font-spline")}>{item.title}</span>
				</Button>
			))}
			{selected && selected?.length > 0 && onClearClick && (
				<Button
					onClick={onClearClick}
					className="inline-flex items-center gap-0.5 border-dashed rounded-full font-sans font-light"
				>
					<Close width={20} />
					<div className={cn("lowercase", "font-aspecta")}>clear</div>
				</Button>
			)}
		</div>
	);
}
