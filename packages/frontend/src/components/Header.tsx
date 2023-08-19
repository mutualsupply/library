"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { PropsWithChildren } from "react"
import { cn } from "utils"

export default function Header() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div className="flex items-center justify-between py-4">
      <div className={cn("inline-flex", "items-center")}>
        <Link href={"/"}>
          <Image
            src={"/images/apple.gif"}
            alt={"s/o blackboard"}
            width={64}
            height={64}
          />
        </Link>
        <span className={cn("font-sans", "ml-6")}>MUTUAL Research Library</span>
      </div>
      <div className={cn("items-center", "gap-4", "hidden", "md:flex")}>
        <NavButton isSelected={pathname === "/"} href="/">
          Index
        </NavButton>
        <NavButton
          isSelected={pathname === "/create-case"}
          href="https://www.mutual.supply/"
        >
          Submit a report
        </NavButton>
        <NavButton href="">Info</NavButton>
      </div>
    </div>
  )
}

interface NavButtonProps {
  href: string
  isSelected?: boolean
}

const NavButton = ({
  href,
  children,
  isSelected,
}: PropsWithChildren<NavButtonProps>) => {
  return (
    <Link
      href={href}
      className={cn(
        "border",
        "border-dashed",
        "rounded-2xl",
        "bg-[#FBFBFB]",
        "border-black",
        "font-aspekta",
        "w-36",
        "h-12",
        "inline-flex",
        "items-center",
        "justify-center",
        { "bg-primary border-transparent text-white": isSelected },
      )}
    >
      {children}
    </Link>
  )
}
