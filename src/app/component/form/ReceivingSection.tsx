import Image from "next/image";
import { FaChevronDown, FaSearch } from "react-icons/fa";

interface ReceivingSectionProps {
  receivingAmount: string;
  setReceivingAmount: (amount: string) => void;
  selectedReceiveToken: any;
  showReceiveTokenList: boolean;
  setShowReceiveTokenList: (show: boolean) => void;
  searchToken: string;
  setSearchToken: (token: string) => void;
  filteredTokens: any[];
  selectReceiveToken: (token: any) => void;
}

export const ReceivingSection = ({
  receivingAmount,
  setReceivingAmount,
  selectedReceiveToken,
  showReceiveTokenList,
  setShowReceiveTokenList,
  searchToken,
  setSearchToken,
  filteredTokens,
  selectReceiveToken,
}: ReceivingSectionProps) => {
  return (
    <div className="mb-8 relative">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-300">To Receive</p>
        <p className="text-sm text-gray-400">
          Balance: {selectedReceiveToken.balance} {selectedReceiveToken.symbol}
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
          <Image
            width={24}
            height={24}
            src={selectedReceiveToken.icon}
            alt={selectedReceiveToken.symbol}
            className="rounded-full"
          />
          <span className="text-yellow-400 font-medium">
            {selectedReceiveToken.symbol}
          </span>
          <FaChevronDown className="text-gray-400 text-xs" />
        </div>
      </div>
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
