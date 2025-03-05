import Image from "next/image";
import { FaChevronDown, FaSearch } from "react-icons/fa";

interface PayingSectionProps {
  payingAmount: string;
  setPayingAmount: (amount: string) => void;
  selectedPayToken: any;
  showPayTokenList: boolean;
  setShowPayTokenList: (show: boolean) => void;
  searchToken: string;
  setSearchToken: (token: string) => void;
  filteredTokens: any[];
  selectPayToken: (token: any) => void;
}

export const PayingSection = ({
  payingAmount,
  setPayingAmount,
  selectedPayToken,
  showPayTokenList,
  setShowPayTokenList,
  searchToken,
  setSearchToken,
  filteredTokens,
  selectPayToken,
}: PayingSectionProps) => {
  return (
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
          step="0.00000001"
          max="100"
          min="0"
          value={payingAmount}
          onChange={(e) => setPayingAmount(e.target.value)}
        />
        <div
          className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
          onClick={() => setShowPayTokenList(!showPayTokenList)}
        >
          <Image
            width={24}
            height={24}
            src={selectedPayToken.icon}
            alt={selectedPayToken.symbol}
            className="rounded-full"
          />
          <span className="text-yellow-400 font-medium">
            {selectedPayToken.symbol}
          </span>
          <FaChevronDown className="text-gray-400 text-xs" />
        </div>
      </div>
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
                  <Image
                    width={24}
                    height={24}
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
  );
};
