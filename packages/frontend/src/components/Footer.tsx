import { cn } from "utils";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function Footer() {
	return (
		<div className={cn("mt-24", "flex", "justify-center")}>
			<div className={cn("flex", "items-center", "gap-1")}>
				<Image
					alt="apple-logo"
					width={24}
					height={24}
					src="/images/apple.gif"
				/>
				<div>
					Manifested by <Badge>MUTUAL</Badge>
				</div>
			</div>
		</div>
	);
}
