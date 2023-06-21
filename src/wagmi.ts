"use client";

import { getDefaultConfig } from "connectkit";
import { configureChains, createConfig } from "wagmi";
import { arbitrum, goerli, mainnet, optimism, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import env from "./services/env";

const { chains } = configureChains(
  [mainnet, optimism, arbitrum, goerli, sepolia],
  [alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_KEY }), publicProvider()]
);

export const config = createConfig(
  getDefaultConfig({
    alchemyId: env.NEXT_PUBLIC_ALCHEMY_KEY,
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_ID,
    appName: "Mutual Supply",
    autoConnect: true,
    chains,
  })
);
