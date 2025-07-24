"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState, type Config } from "wagmi";
import { createAppKit } from "@reown/appkit/react";
import { config, networks, projectId, wagmiAdapter } from "@/config";
import { metisSepolia } from "@reown/appkit/networks";

const queryClient = new QueryClient();

const metadata = {
  name: "Tai Shang Micro AI",
  description: "Tai Shang Micro AI",
  url: typeof window !== "undefined" ? window.location.origin : "/",
  icons: ["/favicon.ico"],
};

if (!projectId) {
  console.error("AppKit Initialization Error: Project ID is missing.");
} else {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId: projectId!,
    networks: networks,
    defaultNetwork: metisSepolia,
    metadata,
    features: { analytics: false, email: false, socials: false },
    themeVariables: {
      "--w3m-accent": "#2c2840",
    },
  });
}

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(config as Config, cookies);

  return (
    <WagmiProvider config={config as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
