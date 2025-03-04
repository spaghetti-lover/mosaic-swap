import { FaExchangeAlt } from "react-icons/fa";
export const SwapIcon = () => {
  return (
    <div className="flex justify-center my-4 relative">
      <div className="absolute left-0 right-0 border-t border-gray-700 top-1/2"></div>
      <button className="bg-yellow-500 text-black p-3 rounded-full z-10 hover:bg-yellow-400 transition shadow-lg">
        <FaExchangeAlt />
      </button>
    </div>
  );
};
