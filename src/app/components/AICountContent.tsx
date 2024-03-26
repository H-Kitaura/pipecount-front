import React from "react";
import { Annotation } from "../schemas/type";

type Props = {
  annotation: Annotation;
};

const AICountContent = ({ annotation }: Props) => {
  return (
    <div className="my-4 bg-white p-2 shadow flex items-center justify-between">
      <p className="text-lg font-semibold">カウント</p>
      <p className="text-4xl font-bold leading-none shadow px-4 bg-slate-50 my-1">
        {annotation.points.length}
      </p>
    </div>
  );
};

export default AICountContent;
