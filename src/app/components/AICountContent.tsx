import React from "react";
import { Annotation } from "../schemas/type";

type Props = {
  annotation: Annotation;
};

const AICountContent = ({ annotation }: Props) => {
  return (
    <div className="my-4 bg-white p-2 shadow ">
      <p className="mb-2 text-lg font-semibold">カウント</p>
      <p className="text-4xl font-bold leading-none">
        {annotation.points.length}
      </p>
    </div>
  );
};

export default AICountContent;
