import { alphabet, cn } from "utils"
import { Button } from "./ui/button"

interface AlphaToggleProps {
  onClick: (char: string) => void
  selected?: Array<string>
}

export default function AlphaToggle({ onClick, selected }: AlphaToggleProps) {
  return (
    <div className={cn("flex", "items-center", "gap-3", "flex-wrap")}>
      {alphabet.map((char, index) => (
        <Button
          key={`${char}-${index}`}
          onClick={() => onClick(char)}
          className={cn(
            {
              [cn("bg-primary", "text-white", "border-transparent")]:
                selected?.includes(char),
            },
            "font-aspekta",
            "font-light",
            "w-[28px]",
            "h-[28px]",
          )}
        >
          {char}
        </Button>
      ))}
    </div>
  )
}
