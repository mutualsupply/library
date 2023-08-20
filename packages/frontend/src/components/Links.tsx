import { ArrowLeftIcon } from "@radix-ui/react-icons"
import NextLink from "next/link"
import { ReactNode } from "react"
import { cn } from "utils"

export const BackLink = ({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex",
        "items-center",
        "gap-1",
        "text-sm",
        "border-b",
        "no-underline",
        "text-primary",
        "border-primary",
      )}
    >
      <ArrowLeftIcon /> {children}
    </Link>
  )
}

export const BestPracticesLink = () => {
  return (
    <Link
      isExternal={true}
      href="https://www.notion.so/MUTUAL-Framework-for-Building-Experiences-In-The-New-Internet-616cc2ffe809465b9de17087301b65d9"
    >
      Best Practices Guide
    </Link>
  )
}

interface CustomLinkProps {
  children?: ReactNode
  href: string
  isExternal?: boolean
  className?: string
}

export const Link = ({ isExternal, className, ...rest }: CustomLinkProps) => {
  return (
    <NextLink
      {...rest}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={cn("text-primary", "underline", className)}
    />
  )
}
