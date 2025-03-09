import { useEffect, useState } from "react";
import { FaCog, FaExchangeAlt } from "react-icons/fa";
import { swapTokens, swapTokensAndTransactionWithouPrivateKey } from "@/app/helper/index.ts";
import "@razorlabs/razorkit/style.css";
import { PriceInfo } from "@/app/component/PriceInfo";
import { tokens } from "@/app/variable/token";
import { PayingSection } from "./PayingSection";
import { ReceivingSection } from "./ReceivingSection";
import { SwapButton } from "./SwapButton";
import { useWallet } from "@razorlabs/razorkit";

export const TokenForm = () => {
  const [payingAmount, setPayingAmount] = useState("0.0001");
  const [receivingAmount, setReceivingAmount] = useState("");
  const [showPayTokenList, setShowPayTokenList] = useState(false);
  const [showReceiveTokenList, setShowReceiveTokenList] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [selectedPayToken, setSelectedPayToken] = useState({
    symbol: "MOVE",
    name: "Mosaic Movement",
    balance: "13.45",
    icon: "/image/MOVE.png",
    srcAsset: "0xa",
    decimal: 8,
  });
  const [selectedReceiveToken, setSelectedReceiveToken] = useState({
    symbol: "USDC.e",
    name: "USDC.e",
    balance: "0.05",
    icon: "/image/USDC.png",
    srcAsset:
      "0xb89077cfd2a82a0c1450534d49cfd5f2707643155273069bc23a912bcfefdee7",
    decimal: 6,
  });
  const [searchToken, setSearchToken] = useState("");


  const handleSwapTokens = () => {
    const tempPayToken = selectedPayToken;
    setSelectedPayToken(selectedReceiveToken);
    setSelectedReceiveToken(tempPayToken);
  };

  const { signAndSubmitTransaction, connected, changeNetwork } = useWallet();

  const handleSwapAndTransaction = async () => {
    if (!connected) {
      alert("Please login");
      return;
    }
    try {
      setIsSwapping(true);
      const executedTransaction = await swapTokensAndTransactionWithouPrivateKey(
        selectedPayToken.srcAsset,
        selectedReceiveToken.srcAsset,
        parseFloat(payingAmount),
        selectedPayToken.decimal,
        selectedReceiveToken.decimal,
        signAndSubmitTransaction
      );
      alert("Swap successful: " + executedTransaction);
    } catch (error) {
      console.error("Error swapping tokens:", error);
    } finally {
      setIsSwapping(false);
    }
  };

  const handleSwap = async () => {
    try {
      const swappedAmount = await swapTokens(
        selectedPayToken.srcAsset,
        selectedReceiveToken.srcAsset,
        parseFloat(payingAmount),
        selectedPayToken.decimal,
        selectedReceiveToken.decimal
      );
      setReceivingAmount(swappedAmount || "");
    } catch (error) {
      console.error("Error swapping tokens:", error);
    }
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
      token.name.toLowerCase().includes(searchToken.toLowerCase())
  );

  const selectPayToken = (token: any) => {
    setSelectedPayToken(token);
    setShowPayTokenList(false);
  };

  const selectReceiveToken = (token: any) => {
    setSelectedReceiveToken(token);
    setShowReceiveTokenList(false);
  };

  useEffect(() => {
    if (!payingAmount) return;

    const delayDebounce = setTimeout(async () => {
      handleSwap();
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [payingAmount, selectedPayToken, selectedReceiveToken]);

  return (
    <form className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Swap Tokens</h2>
        <FaCog
          className="cursor-pointer text-gray-400 hover:text-white transition text-lg"
          style={{ transition: "transform 1s", transformOrigin: "center" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(360deg)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
        />
      </div>

      <PayingSection
        payingAmount={payingAmount}
        setPayingAmount={setPayingAmount}
        selectedPayToken={selectedPayToken}
        showPayTokenList={showPayTokenList}
        setShowPayTokenList={setShowPayTokenList}
        searchToken={searchToken}
        setSearchToken={setSearchToken}
        filteredTokens={filteredTokens}
        selectPayToken={selectPayToken}
      />

      <div className="flex justify-center my-4 relative">
        <div className="absolute left-0 right-0 border-t border-gray-700 top-1/2"></div>
        <button
          type="button"
          className="bg-yellow-500 text-black p-3 rounded-full z-10 hover:bg-yellow-400 transition shadow-lg"
          onClick={handleSwapTokens}
        >
          <FaExchangeAlt />
        </button>
      </div>

      <ReceivingSection
        receivingAmount={receivingAmount}
        setReceivingAmount={setReceivingAmount}
        selectedReceiveToken={selectedReceiveToken}
        showReceiveTokenList={showReceiveTokenList}
        setShowReceiveTokenList={setShowReceiveTokenList}
        searchToken={searchToken}
        setSearchToken={setSearchToken}
        filteredTokens={filteredTokens}
        selectReceiveToken={selectReceiveToken}
      />

      <PriceInfo
        selectedPayToken={selectedPayToken}
        selectedReceiveToken={selectedReceiveToken}
      />

      <SwapButton
        isSwapping={isSwapping}
        handleSwapAndTransaction={handleSwapAndTransaction}
      />
    </form>
  );
};