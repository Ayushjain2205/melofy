"use client";

import { createCoinCall } from "@zoralabs/coins-sdk";
import { Address, Hex } from "viem";

// Zora Coin Factory Contract Address on Base
const ZORA_COIN_FACTORY = "0x902a29f2c97ebb57dfc460e61e2c6a005a25c00d" as const;

// Zora Coin Factory ABI (minimal required functions)
const ZORA_COIN_FACTORY_ABI = [
  {
    inputs: [
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
      { name: "uri", type: "string" },
      { name: "owners", type: "address[]" },
      { name: "tickLower", type: "int24" },
      { name: "payoutRecipient", type: "address" },
      { name: "platformReferrer", type: "address" },
      { name: "initialPurchaseAmount", type: "uint256" },
    ],
    name: "createCoin",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export interface CreateCoinParams {
  name: string;
  symbol: string;
  description: string;
  imageUrl?: string;
  payoutRecipient: Address;
}

export interface ContractWriteRequest {
  abi: readonly any[];
  address: Address;
  args: readonly unknown[];
  functionName: string;
}

export const generateCoinMetadata = async (params: CreateCoinParams) => {
  // Create metadata object
  const metadata = {
    name: params.name,
    description: params.description,
    image: params.imageUrl || "",
    properties: {
      symbol: params.symbol,
    },
  };

  // Convert metadata to base64 encoded JSON
  const jsonMetadata = JSON.stringify(metadata);
  const base64Metadata = Buffer.from(jsonMetadata).toString("base64");
  const dataUri = `data:application/json;base64,${base64Metadata}`;

  return dataUri;
};

export const prepareCoinCreation = async (
  params: CreateCoinParams
): Promise<{ request: ContractWriteRequest }> => {
  try {
    const uri = await generateCoinMetadata(params);

    // Create coin parameters
    return {
      request: {
        abi: ZORA_COIN_FACTORY_ABI,
        address: ZORA_COIN_FACTORY,
        args: [
          params.name,
          params.symbol,
          uri,
          [], // No additional owners
          -887272, // Default tick lower
          params.payoutRecipient,
          "0x0000000000000000000000000000000000000000", // No platform referrer
          BigInt(0), // No initial purchase
        ],
        functionName: "createCoin",
      },
    };
  } catch (error) {
    console.error("Error preparing coin creation:", error);
    throw new Error("Failed to prepare coin creation");
  }
};
