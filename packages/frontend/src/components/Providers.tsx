"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";
import { config } from "../wagmi";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<WagmiConfig config={config}>
					<ConnectKitProvider theme="minimal">{children}</ConnectKitProvider>
				</WagmiConfig>
			</QueryClientProvider>
		</SessionProvider>
	);
}
