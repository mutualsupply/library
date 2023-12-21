import { cn } from "utils";
import { ServerCaseStudy } from "../../lib/interfaces";

interface DraftProps {
	draft: ServerCaseStudy;
	onClick: () => void;
}

export default function Draft({ draft, onClick }: DraftProps) {
	return (
		<div
			className={cn(
				"border",
				"border-primary",
				"p-4",
				"hover:bg-tertiary",
				"cursor-pointer",
			)}
			onClick={onClick}
			onKeyDown={onClick}
		>
			<div className={cn("flex", "items-center", "justify-between")}>
				<div className={cn("font-aspekta", "underline")}>
					{draft.content.title ? draft.content.title : "No title found"}
				</div>
				<div>{draft.content.type ? draft.content.type : "No type found"}</div>
			</div>
			<div className={cn("mt-2", "text-primary")}>
				{draft.content.name ? draft.content.name : "No name found"}
			</div>
		</div>
	);
}
