import { cn } from "utils";

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={cn("prose", "max-w-full")}>{children}</div>;
}
