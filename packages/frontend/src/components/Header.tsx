"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"
import { cn } from "utils"
import { isDev } from "../lib/env"

export default function Header() {
  const pathname = usePathname()
  return (
    <div className="flex items-center justify-between py-4 mb-10">
      <div className={cn("inline-flex", "items-center")}>
        <Link href={"/"}>
          <Image
            src={"/images/glasses.png"}
            alt={"s/o blackboard"}
            width={91}
            height={48}
          />
        </Link>
      </div>
      <div className={cn("items-center", "gap-4", "hidden", "md:flex")}>
        {isDev() && (
          <NavButton isSelected={pathname === "/dev"} href="/dev">
            Dev
          </NavButton>
        )}
        <NavButton isSelected={pathname === "/"} href="/">
          Index
        </NavButton>
        <NavButton isSelected={pathname === "/create-case"} href="/create-case">
          Submit
        </NavButton>
        <NavButton href="https://www.mutual.supply/library#what">
          Info
        </NavButton>
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
