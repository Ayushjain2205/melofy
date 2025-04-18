"use client";

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { type Connector } from "wagmi";

export function WalletConnect() {
  const { connect, connectors, error, status } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-[#FF99D1] font-mono">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          className="border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-white"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {connectors.map((connector: Connector) => (
        <Button
          disabled={!connector.ready || status === "pending"}
          key={connector.id}
          onClick={() => connect({ connector })}
          className="bg-[#FF00FF] text-white hover:bg-[#FF66B8]"
        >
          {status === "pending" ? "Connecting..." : "Connect Wallet"}
        </Button>
      ))}
    </div>
  );
}
