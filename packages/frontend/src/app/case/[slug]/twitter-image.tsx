import { ImageResponse } from "next/server";
import ServerClient from "../../lib/serverClient";

export const config = {
	// Route segment config
	runtime: "edge",
	// Image metadata
	alt: "Case Study",
	size: {
		width: 1200,
		height: 630,
	},
	contentType: "image/png",
	revalidate: 0,
};

// Image generation
export default async function CaseImage({
	params: { slug },
}: { params: { slug: string } }) {
	// Font
	const otBrut = fetch(
		new URL("/public/fonts/OTBrut-Regular.otf", import.meta.url),
	).then((res) => res.arrayBuffer());

	const caseStudy = await ServerClient.getCaseBySlug(slug);

	return new ImageResponse(
		// ImageResponse JSX element
		<div
			style={{
				fontSize: 128,
				background: "white",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "#0C89E9",
				fontFamily: "otBrut",
				textAlign: "center",
				backgroundImage: "url('/images/bg-pattern.svg')",
			}}
		>
			{caseStudy.content.title}
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...config.size,
			fonts: [
				{
					name: "otBrut",
					data: await otBrut,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
