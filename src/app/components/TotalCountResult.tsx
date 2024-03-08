import React from "react";
type Props = {
  totalCounts: number[];
};

const TotalCountResult = ({ totalCounts }: Props) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <p className="">トータル数</p>
      {totalCounts.reduce((a, b) => a + b, 0)}
    </div>
  );
};

export default TotalCountResult;
