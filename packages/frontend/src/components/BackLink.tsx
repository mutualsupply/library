import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "utils";

const BackLink = ({
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

export default BackLink;
