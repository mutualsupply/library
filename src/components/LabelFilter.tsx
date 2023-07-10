import { cn } from "utils";
import { Button } from "./ui/button";

interface LabelFilterProps {
  items: { key: string; title: string }[];
  selected?: string[];
  onClick?: (key: string) => void;
}

export default function LabelFilter({
  items,
  selected,
  onClick,
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
    </div>
  );
}
