import { cn } from "utils"

export default function Section({
  title,
  children,
  size = "sm",
}: {
  title?: string
  children: React.ReactNode
  size?: "sm" | "lg"
}) {
  return (
    <div className={cn("flex", "flex-col", "gap-4")}>
      {title && (
        <div
          className={cn("font-otBrut", "text-primary", {
            "text-2xl": size === "sm",
            "text-6xl": size === "lg",
          })}
        >
          {title}
        </div>
      )}
      <div
        className={cn(
          "flex",
          "flex-col",
          "gap-4",
          "font-aspekta",
          "font-light",
        )}
      >
        {children}
      </div>
    </div>
  )
}
