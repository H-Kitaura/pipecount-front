import React from "react";
import { style } from "../styles/style";
import RetakephotoButton from "./button/RetakephotoButton";
import SendButton from "./button/SendButton";
import { Annotation } from "../schemas/type";

type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  size: any;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
};

const ImageView = ({ setMode, size, annotation, setAnnotation }: Props) => {
  if (annotation.imageBase64 === null) return;
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <img
        src={annotation.imageBase64}
        // width={800}
        // height={800}
        // width={size.width}
        // height={size.height}
        className="w-full h-auto"
        alt="image"
      />
      <div className="flex items-center justify-center w-full space-x-4 my-4">
        <RetakephotoButton setMode={setMode} setAnnotation={setAnnotation} />
        <SendButton setMode={setMode} />
      </div>
    </div>
  );
};

export default ImageView;
