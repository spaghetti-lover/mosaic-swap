import { FaWallet } from "react-icons/fa";

export const SwapButton = ({
  isSwapping,
  handleSwapAndTransaction,
}: {
  isSwapping: boolean;
  handleSwapAndTransaction: () => void;
}) => {
  return (
    <>
      <button
        className={`cursor-pointer w-full px-4 py-4 rounded-xl text-lg font-semibold transition shadow-lg flex items-center justify-center gap-2 
          ${
            isSwapping
              ? "bg-gray-600 cursor-not-allowed text-black"
              : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black"
          }`}
        disabled={isSwapping}
        onClick={handleSwapAndTransaction}
      >
        <FaWallet />
        {isSwapping ? "Swapping..." : "Swap"}
      </button>
    </>
  );
};
