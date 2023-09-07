import { cn } from "utils"

export default function Footer() {
  return (
    <div
      className={cn(
        "mt-24",
        "flex",
        "justify-between",
        "items-center",
        "font-aspekta",
      )}
    >
      <div className={cn("flex", "items-center", "gap-4")}>
        <div>logo</div>
        <div>
          This website is maintained and stewarded by the MUTUAL collective.{" "}
        </div>
      </div>
      <div>Ⓒ MUTUAL 2023. All Rights Reserved.</div>
    </div>
  )
}
