"use client";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { DefaultChains, WalletProvider } from "@razorlabs/razorkit";
import "@razorlabs/razorkit/style.css";
import { TokenForm } from "./component/form/Form";

export default function SwapPage() {
  return (
    <WalletProvider chains={DefaultChains}>
      <div className="min-h-screen  text-white flex flex-col items-center p-6">
        {/* Header */}
        <Header />
        {/* Swap Box */}
        <TokenForm />
        {/* Footer */}
        <Footer />
      </div>
    </WalletProvider>
  );
}