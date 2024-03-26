import React from "react";
type Props = {
  totalCounts: number[];
};
const CountResult = ({ totalCounts }: Props) => {
  return (
    <div className="p-2 bg-white shadow mx-4">
      <p className="text-start text-lg font-semibold mb-1">過去のカウント</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {totalCounts.map((count, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-2 shadow "
          >
            <p className="text-xs font-medium text-gray-800">
              {index + 1}回目:
            </p>
            <p className="text-lg font-bold text-gray-600 shadow px-4 bg-slate-50">
              {count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CountResult;
