import React from "react";
type Props = {
  totalCounts: number[];
};

const TotalCountResult = ({ totalCounts }: Props) => {
  return (
    <div className="my-4 bg-white p-2 shadow  flex items-center justify-between">
      <p className="text-lg font-semibold">合計</p>
      <p className="text-4xl font-bold leading-none shadow px-4 bg-slate-50 my-1">
        {totalCounts.reduce((a, b) => a + b, 0)}
      </p>
    </div>
  );
};

export default TotalCountResult;
