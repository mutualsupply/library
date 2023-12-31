import { getServerSession } from "next-auth";
import CreateCasePage from "../../../components/CreateCase";
import ServerClient from "../../../lib/serverClient";

async function getDraft(id: number) {
	const session = await getServerSession();
	if (!session) {
		return null;
	}

	if (!session.user?.email) {
		throw new Error("Not authorized");
	}

	return ServerClient.getDraft(session.user.email, id);
}

export default async function CreateIDPage({
	params: { id },
}: { params: { id: string } }) {
	const draft = await getDraft(parseInt(id));
	if (!draft) {
		return <div>404</div>;
	}
	return <CreateCasePage draft={draft} />;
}
