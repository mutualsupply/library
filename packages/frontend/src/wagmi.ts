"use client";

import { getDefaultConfig } from "connectkit";
import { configureChains, createConfig } from "wagmi";
import { optimism } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import env from "./lib/env";

const { chains } = configureChains(
	[optimism],
	[alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_KEY }), publicProvider()],
);

export const config = createConfig(
	getDefaultConfig({
		alchemyId: env.NEXT_PUBLIC_ALCHEMY_KEY,
		walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_ID,
		appName: "Mutual Supply",
		autoConnect: true,
		chains,
	}),
);
