"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { cn } from "utils";
import { isDev } from "../lib/env";
import { Button, OPButton } from "./ui/button";
import Hamburger from "./icons/Hamburger";
import Close from "./icons/Close";
import Footer from "./Footer";
import { useRouter } from "next/navigation";

export default function Header() {
	const pathname = usePathname();

	const [showMenu, setShowMenu] = useState(false);
	const [currentPath, setCurrentPath] = useState(pathname);
	useEffect(() => {
		if (pathname !== currentPath) {
			setShowMenu(false);
			setCurrentPath(pathname);
		}
	}, [pathname, currentPath]);
	return (
		<div className="flex items-center justify-between mb-10">
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
			<div className={cn("items-center", "gap-4", "hidden", "lg:flex")}>
				<OPLink />
				<NavLinks />
			</div>
			<div className={cn("block lg:hidden")}>
				<Button
					variant="outline"
					size="lg"
					onClick={() => setShowMenu(!showMenu)}
					className={cn("w-20 p-0")}
				>
					<Hamburger className="w-6" />
				</Button>
			</div>
			<MobileMenu show={showMenu} onHide={() => setShowMenu(false)} />
		</div>
	);
}

function OPLink() {
	return (
		<Link href="https://www.mutual.supply/library#second">
			<OPButton />
		</Link>
	);
}

function NavLinks() {
	const pathname = usePathname();
	return (
		<>
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
			<NavButton isSelected={pathname === "/"} href="/">
				Index
			</NavButton>
			<NavButton isSelected={pathname === "/create-case"} href="/create-case">
				Submit
			</NavButton>
			<NavButton href="https://www.mutual.supply/library#what">
				Information
			</NavButton>
		</>
	);
}

interface MobileMenuProps {
	show: boolean;
	onHide: () => void;
}

function MobileMenu({ show, onHide }: MobileMenuProps) {
	return (
		<div
			className={cn(
				"absolute inset-0 z-50 bg-[#D1E8FA]",
				show ? "flex flex-col" : "hidden",
			)}
		>
			<div className={cn("p-4 grow flex flex-col")}>
				<div className={cn("flex justify-end")}>
					<Button
						variant="blueOutline"
						size="lg"
						onClick={onHide}
						className={cn("w-20 p-0")}
					>
						<Close className={cn("h-4")} />
					</Button>
				</div>
				<div className="flex flex-col space-y-4 items-center justify-center grow">
					<div className={cn("mb-3")}>
						<OPLink />
					</div>
					<NavLinks />
				</div>
			</div>
			<Footer />
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
			<Button
				size="lg"
				variant={isSelected ? "blueOutline" : "outline"}
				className={cn("w-32")}
			>
				{children}
			</Button>
		</Link>
	);
};
