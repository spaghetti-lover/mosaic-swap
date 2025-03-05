import { Token } from "../interface/token";

interface PriceInfoProps {
  selectedPayToken: Token;
  selectedReceiveToken: Token;
}

export const PriceInfo = ({
  selectedPayToken,
  selectedReceiveToken,
}: PriceInfoProps) => {
  return (
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
  );
};
