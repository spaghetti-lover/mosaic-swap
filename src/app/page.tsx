"use client";
import { useState } from "react";
import {
  FaCog,
  FaChevronDown,
  FaExchangeAlt,
  FaWallet,
  FaSearch,
} from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { swapTokens } from "@/app/helper/index.ts";
import { Header } from "./component/Header";
import { SwapIcon } from "./component/SwapIcon";
import { Footer } from "./component/Footer";

export default function SwapPage() {
  const [payingAmount, setPayingAmount] = useState("1");
  const [receivingAmount, setReceivingAmount] = useState("");
  const [showPayTokenList, setShowPayTokenList] = useState(false);
  const [showReceiveTokenList, setShowReceiveTokenList] = useState(false);
  const [selectedPayToken, setSelectedPayToken] = useState({
    symbol: "MOVE",
    name: "Mosaic Movement",
    balance: "13.45",
    icon: "/image/Move.png",
    srcAsset: "0xa",
    decimal: 8,
  });
  const [selectedReceiveToken, setSelectedReceiveToken] = useState({
    symbol: "FAKE",
    name: "Fake Token",
    balance: "0",
    icon: "/image/FAKE.png",
    srcAsset:
      "0x2092ebb9cd4279c252efd4a778d143ad65d759401773b4fbbc163513e04ac108",
    decimal: 8,
  });
  const [searchToken, setSearchToken] = useState("");

  const tokens = [
    {
      symbol: "MOVE",
      name: "Movement Coin",
      balance: "13.45",
      icon: "/image/Move.png",
      srcAsset: "0xa",
      decimal: 8,
    },
    {
      symbol: "FAKE",
      name: "The Fake Asset",
      balance: "0",
      icon: "/image/FAKE.png",
      srcAsset:
        "0x2092ebb9cd4279c252efd4a778d143ad65d759401773b4fbbc163513e04ac108",
      decinaml: 8,
    },
    {
      symbol: "USDC.e",
      name: "USDC.e",
      balance: "0.05",
      icon: "/image/USDC.png",
      srcAsset:
        "0xb89077cfd2a82a0c1450534d49cfd5f2707643155273069bc23a912bcfefdee7",
      decimal: 6,
    },
    {
      symbol: "WETH.e",
      name: "WETH.e",
      balance: "0.001",
      icon: "/image/WETH.png",
      srcAsset:
        "0xab85cf20d26368dc43b49152a7b4543eb86c6a2d98c30b9b2cfb7b574f364981",
      decimal: 18,
    },
    {
      symbol: "USDT.e",
      name: "USDT.e",
      balance: "125.75",
      icon: "/image/USDT.png",
      srcAsset:
        "0xc6f5b46ab5307dfe3e565668edcc1461b31cac5a6c2739fba17d9fdde16813a2",
      decimal: 6,
    },
  ];
  const handleSwap = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const swappedAmount = await swapTokens(
        "0x09b7c8121bc6df4d1e60d1d535be70b23f1c2e6a1e2c4031f20fd6028796c968",
        selectedPayToken.srcAsset,
        selectedReceiveToken.srcAsset,
        parseFloat(payingAmount),
        selectedPayToken.decimal
      );
      setReceivingAmount(swappedAmount);
    } catch (error) {
      console.error("Error swapping tokens:", error);
    }
  };
  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
      token.name.toLowerCase().includes(searchToken.toLowerCase())
  );

  const selectPayToken = (token) => {
    setSelectedPayToken(token);
    setShowPayTokenList(false);
  };

  const selectReceiveToken = (token) => {
    setSelectedReceiveToken(token);
    setShowReceiveTokenList(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
      {/* Header */}
      <Header />
      {/* Swap Box */}
      <form
        onSubmit={handleSwap}
        className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700 relative"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Swap Tokens</h2>
          <FaCog className="cursor-pointer text-gray-400 hover:text-white transition text-lg" />
        </div>

        {/* Paying Section */}
        <div className="mb-6 relative">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300">You are Paying</p>
            <p className="text-sm text-gray-400">
              Balance: {selectedPayToken.balance} {selectedPayToken.symbol}
            </p>
          </div>
          <div className="flex justify-between items-center bg-gray-900 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition">
            <input
              type="number"
              className="bg-transparent outline-none text-xl w-full font-medium"
              value={payingAmount}
              onChange={(e) => setPayingAmount(e.target.value)}
            />
            <div
              className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setShowPayTokenList(!showPayTokenList)}
            >
              <img
                src={selectedPayToken.icon}
                alt={selectedPayToken.symbol}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-yellow-400 font-medium">
                {selectedPayToken.symbol}
              </span>
              <FaChevronDown className="text-gray-400 text-xs" />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-400">~$0.51</p>
            <button className="text-sm text-yellow-400 hover:text-yellow-300">
              MAX
            </button>
          </div>

          {/* Token Selection Dropdown for Pay */}
          {showPayTokenList && (
            <div className="absolute mt-2 w-full bg-gray-800 rounded-xl border border-gray-700 shadow-xl z-20">
              <div className="p-3 border-b border-gray-700">
                <h3 className="font-medium mb-2">Select a token</h3>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search name or paste address"
                    className="w-full bg-gray-900 rounded-lg py-2 pl-10 pr-3 outline-none"
                    value={searchToken}
                    onChange={(e) => setSearchToken(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto py-2">
                {filteredTokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => selectPayToken(token)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={token.icon}
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{token.symbol}</p>
                        <p className="text-sm text-gray-400">{token.name}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{token.balance}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Swap Icon */}
        <SwapIcon />

        {/* Receiving Section */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-300">To Receive</p>
            <p className="text-sm text-gray-400">
              Balance: {selectedReceiveToken.balance}{" "}
              {selectedReceiveToken.symbol}
            </p>
          </div>
          <div className="flex justify-between items-center bg-gray-900 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition">
            <input
              type="number"
              className="bg-transparent outline-none text-xl w-full font-medium"
              onChange={(e) => setReceivingAmount(e.target.value)}
              placeholder="swapped value"
              defaultValue={receivingAmount}
            />
            <div
              className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setShowReceiveTokenList(!showReceiveTokenList)}
            >
              <img
                src={selectedReceiveToken.icon}
                alt={selectedReceiveToken.symbol}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-yellow-400 font-medium">
                {selectedReceiveToken.symbol}
              </span>
              <FaChevronDown className="text-gray-400 text-xs" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <p className="text-sm text-red-500">~$0.44 (-12.62%)</p>
            <FiInfo className="text-gray-400 cursor-pointer" />
          </div>

          {/* Token Selection Dropdown for Receive */}
          {showReceiveTokenList && (
            <div className="absolute mt-2 w-full bg-gray-800 rounded-xl border border-gray-700 shadow-xl z-20">
              <div className="p-3 border-b border-gray-700">
                <h3 className="font-medium mb-2">Select a token</h3>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search name or paste address"
                    className="w-full bg-gray-900 rounded-lg py-2 pl-10 pr-3 outline-none"
                    value={searchToken}
                    onChange={(e) => setSearchToken(e.target.value)}
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto py-2">
                {filteredTokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => selectReceiveToken(token)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={token.icon}
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{token.symbol}</p>
                        <p className="text-sm text-gray-400">{token.name}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{token.balance}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price Info */}
        <div className="bg-gray-900/70 p-3 rounded-xl mb-6 border border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300">Price Impact</p>
            <p className="text-sm text-red-500">12.62%</p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-300">Route</p>
            <p className="text-sm text-gray-300">
              {selectedPayToken.symbol} → {selectedReceiveToken.symbol}
            </p>
          </div>
        </div>

        {/* Swap Token Button */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-4 rounded-xl text-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition shadow-lg flex items-center justify-center gap-2"
        >
          <FaWallet />
          Swap
        </button>
      </form>

      {/* Footer */}
      <Footer />
    </div>
  );
}
