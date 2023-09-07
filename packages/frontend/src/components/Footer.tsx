import { cn } from "utils"
import Image from "next/image"

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
        <Image
          alt="apple-logo"
          width={50}
          height={50}
          src="/images/apple.gif"
        />
        <div>
          This website is maintained and stewarded by the MUTUAL collective.{" "}
        </div>
      </div>
      <div>Ⓒ MUTUAL 2023. All Rights Reserved.</div>
    </div>
  )
}
