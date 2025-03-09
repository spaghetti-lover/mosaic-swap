"use client";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { WalletProvider } from "@razorlabs/razorkit";
import "@razorlabs/razorkit/style.css";
import { TokenForm } from "./component/form/Form";

export default function SwapPage() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
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