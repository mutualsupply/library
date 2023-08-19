import { cn } from "utils"

export default function Section({
  title,
  children,
  size = "sm",
}: {
  title: string
  children: React.ReactNode
  size?: "sm" | "lg"
}){
  return (
    <div className={cn("flex", "flex-col", "gap-4", "md:max-w-xl")}>
      <div
        className={cn("font-otBrut", "text-primary", {
          "text-2xl": size === "sm",
          "text-6xl": size === "lg",
        })}
      >
        {title}
      </div>
      <div className={cn("flex", "flex-col", "gap-8")}>{children}</div>
    </div>
  )
}