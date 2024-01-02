"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { optimism } from "wagmi/chains";
import env from "../lib/env";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	const handleLogin = () => {};
	return (
		<SessionProvider>
			<PrivyProvider
				appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
				onSuccess={handleLogin}
				config={{
					loginMethods: ["github", "wallet"],
					appearance: {
						theme: "light",
						accentColor: "#0e89e8",
						logo: "https://dev.research.mutual.supply/images/glasses.png",
						showWalletLoginFirst: true,
					},
					defaultChain: optimism,
					supportedChains: [optimism],
				}}
			>
				<QueryClientProvider client={queryClient}>
					{/* <WagmiConfig config={config}> */}
					{/* <ConnectKitProvider theme="minimal"> */}
					{children}
					{/* </ConnectKitProvider> */}
					{/* </WagmiConfig> */}
				</QueryClientProvider>
			</PrivyProvider>
		</SessionProvider>
	);
}
