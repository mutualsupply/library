import { cn } from "utils";
import HeaderLayout from "../components/layout/HeaderLayout";

export default function NotFound() {
	return (
		<HeaderLayout>
			<div className={cn("flex grow items-center justify-center h-full")}>
				not found
			</div>
		</HeaderLayout>
	);
}
