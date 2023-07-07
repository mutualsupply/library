import { alphabet, cn } from "utils";

interface AlphaToggleProps {
  onClick: (char: string) => void;
  selected?: Array<string>;
}

export default function AlphaToggle({ onClick, selected }: AlphaToggleProps) {
  return (
    <div className={cn("flex", "items-center", "gap-3")}>
      {alphabet.map((char) => (
        <button
          key={char}
          onClick={() => onClick(char)}
          className={cn("border", "border-black", "px-2", {
            [cn("bg-primary", "text-white", "border-transparent")]:
              selected?.includes(char),
          })}
        >
          {char}
        </button>
      ))}
    </div>
  );
}
