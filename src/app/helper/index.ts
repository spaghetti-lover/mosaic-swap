import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  PrivateKey,
  PrivateKeyVariants,
} from "@aptos-labs/ts-sdk";
import axios from "axios";

export async function swapTokens(
  srcAsset: string = "0xa",
  dstAsset: string = "0xb89077cfd2a82a0c1450534d49cfd5f2707643155273069bc23a912bcfefdee7",
  amount: number = 0.0001,
  decimals: number = 8
) {
  try {
    const aptos = new Aptos(
      new AptosConfig({
        fullnode: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
      })
    );
    if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
      throw new Error(
        "PRIVATE_KEY is not defined in the environment variables"
      );
    }
    if (!process.env.NEXT_PUBLIC_X_API_KEY) {
      throw new Error("X_API_KEY is not defined in the environment variables");
    }
    const privateKey = PrivateKey.formatPrivateKey(
      process.env.NEXT_PUBLIC_PRIVATE_KEY,
      PrivateKeyVariants.Ed25519
    );
    const user = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(privateKey),
    });

    // Gọi API lấy báo giá swap từ Mosaic
    const mosaicResponse = await axios.get(
      "https://testnet.mosaic.ag/bardock/v1/quote",
      {
        params: {
          srcAsset: srcAsset,
          dstAsset: dstAsset,
          amount: (amount * 10 ** decimals).toString(),
          sender: user.accountAddress.toString(),
          slippage: 100,
        },
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      }
    );

    if (!mosaicResponse.data || !mosaicResponse.data.data?.tx) {
      throw new Error("Error calling Mosaic API");
    }

    const transaction = await aptos.transaction.build.simple({
      sender: user.accountAddress,
      data: {
        function: mosaicResponse.data.data.tx.function,
        typeArguments: mosaicResponse.data.data.tx.typeArguments || [],
        functionArguments: mosaicResponse.data.data.tx.functionArguments || [],
      },
    });

    const pendingTransactionResponse =
      await aptos.transaction.signAndSubmitTransaction({
        signer: user,
        transaction: transaction,
      });
    console.log("Pending transaction:", pendingTransactionResponse);
    console.log(mosaicResponse);
    return (mosaicResponse.data.data.dstAmount / 10 ** decimals).toFixed(
      decimals
    );
  } catch (error) {
    console.error("Error swapping tokens:", error);
  }
}
