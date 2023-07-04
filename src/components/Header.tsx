"use client";

import Link from "next/link";
import { cn } from "utils";
import Logo from "./icons/Logo";

export function Header() {
  return (
    <div className="flex items-center justify-between p-4">
      <Logo />
      <Nav />
      <JoinButton />
    </div>
  );
}

const Nav = () => {
  return (
    <div className={cn("flex", "items-center", "gap-10", "uppercase")}>
      <Link href={""}>resources</Link>
      <Link href={""}>releases</Link>
      <Link href={""}>about</Link>
    </div>
  );
};

const JoinButton = () => {
  return <button className={cn("uppercase")}>join</button>;
};
