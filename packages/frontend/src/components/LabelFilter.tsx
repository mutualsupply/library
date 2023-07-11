import { cn } from "utils";
import Close from "./icons/Close";
import { Button } from "./ui/button";

interface LabelFilterProps {
  items: { key: string; title: string }[];
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
          variant={"outlineWhite"}
          size={"xs"}
          key={`label-${item.key}-${index}`}
          className={cn(
            "rounded-sm",
            "uppercase",
            "border-sm",
            "border-black",
            {
              [cn("bg-black", "text-white", "border-transparent")]:
                selected?.includes(item.key),
            }
          )}
          onClick={() => onClick && onClick(item.key)}
        >
          {item.title}
        </Button>
      ))}
      {selected && selected?.length > 0 && onClearClick && (
        <Button
          onClick={onClearClick}
          variant="outlineWhite"
          className="inline-flex items-center gap-0.5 border-dashed rounded-full"
          size={"xs"}
        >
          <Close width={20} />
          <div className={cn("uppercase")}>clear</div>
        </Button>
      )}
    </div>
  );
}
