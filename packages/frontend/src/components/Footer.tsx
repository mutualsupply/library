import Image from "next/image";
import { cn } from "utils";
import { Badge } from "./ui/badge";

export default function Footer() {
	return (
		<div
			className={cn("flex", "justify-center", "bg-white", "p-4")}
			style={{ zIndex: 1000 }}
		>
			<div className={cn("flex", "items-center", "gap-1")}>
				<Image
					alt="apple-logo"
					width={24}
					height={24}
					src="/images/apple.gif"
				/>
				<div className="font-aspekta text-sm text-center">
					manifested by <Badge>MUTUAL</Badge>
				</div>
			</div>
		</div>
	);
}
