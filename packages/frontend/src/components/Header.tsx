"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { cn } from "utils";
import { isDev } from "../lib/env";
import { Button, OPButton } from "./ui/button";

export default function Header() {
	const pathname = usePathname();
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
					<Link href="/dev">
						<Button
							className={cn({
								"text-white hover:text-white border-solid bg-red":
									pathname === "/dev",
							})}
							size="lg"
							variant="op"
						>
							Dev
						</Button>
					</Link>
				)}
				<Link href="https://www.mutual.supply/library#second">
					<OPButton />
				</Link>
				<NavButton isSelected={pathname === "/"} href="/">
					Index
				</NavButton>
				<NavButton isSelected={pathname === "/create-case"} href="/create-case">
					Submit
				</NavButton>
				<NavButton href="https://www.mutual.supply/library#what">
					Information
				</NavButton>
			</div>
		</div>
	);
}

interface NavButtonProps {
	href: string;
	isSelected?: boolean;
}

const NavButton = ({
	href,
	children,
	isSelected,
}: PropsWithChildren<NavButtonProps>) => {
	return (
		<Link href={href}>
			<Button size="lg" variant={isSelected ? "blueOutline" : "outline"}>
				{children}
			</Button>
		</Link>
	);
};
