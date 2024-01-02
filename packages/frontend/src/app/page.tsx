import { HomePage } from "../components/HomePage";
import HeaderLayout from "../components/layout/HeaderLayout";
import { getCases } from "../lib/server";

export default function Page() {
	const cases = getCases();
	return (
		<HeaderLayout>
			<HomePage cases={cases} />
		</HeaderLayout>
	);
}
