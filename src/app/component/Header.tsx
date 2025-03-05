import Image from "next/image";
import { FaChevronDown, FaWallet } from "react-icons/fa";
export const Header = () => {
  return (
    <header className="w-full max-w-2xl flex justify-between items-center py-6 mb-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        Mosaic
      </h1>
      <div className="flex items-center space-x-4">
        <div className="text-sm flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
          <Image
            width={6}
            height={6}
            src="/image/MOVE.png"
            alt="Move Token"
            className="w-6 h-6 rounded-full"
          />
          <span>Move</span>
          <FaChevronDown className="text-gray-400 text-xs" />
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-medium hover:from-yellow-400 hover:to-yellow-500 transition shadow-lg flex items-center gap-2">
          <FaWallet />
          Connect Wallet
        </button>
      </div>
    </header>
  );
};
