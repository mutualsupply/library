"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "utils";

export default function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href={"/"}>
        <Image
          src={"/images/apple.gif"}
          alt={"s/o blackboard"}
          width={64}
          height={64}
        />
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
