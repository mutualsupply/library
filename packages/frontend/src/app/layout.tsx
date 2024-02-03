import { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "utils";
import Analytics from "../components/Analytics";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import { isProd } from "../lib/env";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: "LIBRARY",
	description: "Mutual Supply",
	metadataBase: new URL(
		isProd()
			? "https://research.mutual.supply"
			: "https://dev.research.mutual.supply",
	),
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
		userScalable: false,
	},
};

const aeonikFono = localFont({
	src: [
		{
			path: "../../public/fonts/AeonikFonoTRIAL-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/AeonikFonoTRIAL-Light.otf",
			weight: "300",
			style: "normal",
		},
	],
	variable: "--font-aeonik-fono",
});

const aspekta = localFont({
	src: [
		{
			path: "../../public/fonts/Aspekta-300.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/Aspekta-400.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/Aspekta-500.woff2",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-aspekta",
});

const otBrut = localFont({
	src: "../../public/fonts/OTBrut-Regular.otf",
	variable: "--font-ot-brut",
	style: "normal",
});

const splineSans = localFont({
	src: [
		{
			path: "../../public/fonts/SplineSansMono-Light.ttf",
			weight: "300",
			style: "normal",
		},
	],
	variable: "--font-spline-sans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-[calc(100dvh)]",
					"font-sans",
					"flex",
					"flex-col",
					"font-light",
					aeonikFono.variable,
					aspekta.variable,
					otBrut.variable,
					splineSans.variable,
				)}
			>
				<Analytics />
				<Providers>
					<div className={cn("flex-grow flex flex-col")}>{children}</div>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
