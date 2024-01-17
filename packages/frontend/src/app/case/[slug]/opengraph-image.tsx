import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Case Study";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
	params: { slug },
}: { params: { slug: string } }) {
	// Font
	const otBrut = fetch(
		new URL("/public/fonts/OTBrut-Regular.woff2", import.meta.url),
	).then((res) => res.arrayBuffer());

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
			}}
		>
			{slug}
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				{
					name: "OT Brut",
					data: await otBrut,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
