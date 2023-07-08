"use client";

import Link from "next/link";
import { cn } from "utils";
import Logo from "./icons/Logo";

export default function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href={"/"}>
        <Logo />
      </Link>
      <Nav />
      <button className={cn("uppercase", "hidden", "md:block")}>join</button>
    </div>
  );
}

const Nav = () => {
  return (
    <div
      className={cn("items-center", "gap-10", "uppercase", "hidden", "md:flex")}
    >
      <Link href={""}>resources</Link>
      <Link href={""}>releases</Link>
      <Link href={""}>about</Link>
    </div>
  );
};
