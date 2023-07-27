import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "utils";

export const BackLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
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
        "border-black"
      )}
    >
      <ArrowLeftIcon /> {children}
    </Link>
  );
};

export const BestPracticesLink = () => {
  return (
    <Link
      target="_blank"
      rel="noreferrer"
      href="https://www.notion.so/MUTUAL-Framework-for-Building-Experiences-In-The-New-Internet-616cc2ffe809465b9de17087301b65d9"
      className={cn("text-primary")}
    >
      Best Practices Guide
    </Link>
  );
};
