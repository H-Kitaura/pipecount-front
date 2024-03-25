import React from "react";
type Props = {
  totalCounts: number[];
};

const TotalCountResult = ({ totalCounts }: Props) => {
  return (
    <div className="my-4 bg-white p-2 shadow ">
      <p className="mb-2 text-lg font-semibold">合計</p>
      <p className="text-4xl font-bold leading-none">
        {totalCounts.reduce((a, b) => a + b, 0)}
      </p>
    </div>
  );
};

export default TotalCountResult;
