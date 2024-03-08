import React from "react";
type Props = {
  totalCounts: number[];
};
const CountResult = ({ totalCounts }: Props) => {
  return (
    <div>
      <p className="text-center">現在までのカウント</p>
      <div className="flex items-center justify-center space-x-2">
        {totalCounts.map((count, index) => (
          <p className="" key={index}>
            {index + 1}:{count}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CountResult;
