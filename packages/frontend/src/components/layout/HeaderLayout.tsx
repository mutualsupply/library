import { cn } from "utils";
import Header from "../../components/Header";

export default function HeaderLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className={cn("px-4 pt-4 grow flex flex-col pb-[56px]")}>
			<Header />
			{children}
		</div>
	);
}
