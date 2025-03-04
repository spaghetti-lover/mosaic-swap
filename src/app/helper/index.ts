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
  privateKey: string = "0x09b7c8121bc6df4d1e60d1d535be70b23f1c2e6a1e2c4031f20fd6028796c968",
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
    // const privateKeyHex = PrivateKey.formatPrivateKey(
    //   "0x09b7c8121bc6df4d1e60d1d535be70b23f1c2e6a1e2c4031f20fd6028796c968",
    //   PrivateKeyVariants.Ed25519
    // );
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
          amount: (amount * 100000000).toString(),
          sender: user.accountAddress.toString(),
          slippage: 100,
        },
        headers: {
          "X-API-KEY": "PWNpDllwqV7DdnKVThUhGF7i0F2FpDFm",
        },
      }
    );

    if (!mosaicResponse.data || !mosaicResponse.data.data?.tx) {
      throw new Error("Lỗi goi API  dcm nhà m");
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
