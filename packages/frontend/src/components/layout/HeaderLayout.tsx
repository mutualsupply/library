import { cn } from "utils";
import Header from "../../components/Header";

export default function HeaderLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className={cn("p-4")}>
			<Header />
			{children}
		</div>
	);
}
