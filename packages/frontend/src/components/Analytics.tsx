"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import { hotjar } from "react-hotjar";
import env from "../lib/env";

export default function Analytics() {
	useEffect(() => {
		hotjar.initialize(env.NEXT_PUBLIC_HJID, env.NEXT_PUBLIC_HJSV);
	}, []);
	return <GoogleAnalytics gaId={env.NEXT_PUBLIC_GAID} />;
}
