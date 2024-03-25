import React from "react";
type Props = {
  totalCounts: number[];
};
const CountResult = ({ totalCounts }: Props) => {
  return (
    <div>
      <div className="my-4 px-8">
        <p className="mb-2 text-lg font-semibold">過去のカウント</p>
        <div className="grid grid-cols-3 gap-4">
          {totalCounts.map((count, index) => (
            <p key={index} className="text-4xl font-bold leading-none">
              {index + 1}
              {"=>"}
              {count}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountResult;
