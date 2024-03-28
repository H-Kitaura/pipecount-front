import { style } from "@/app/styles/style";
import React from "react";
import {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "../Modal";
import useDisclosure from "@/app/Hooks/useDisclosure";
import { Annotation, Feedback } from "@/app/schemas/type";
import axios from "axios";
import BigButton from "./BigButton";

type Props = {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setTotalCounts: React.Dispatch<React.SetStateAction<number[]>>;
  annotation: Annotation;
  setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
  feedBack: Feedback;
  setFeedBack: React.Dispatch<React.SetStateAction<Feedback>>;
};

const ReportButton = ({
  setMode,
  setTotalCounts,
  annotation,
  setAnnotation,
  feedBack,
  setFeedBack,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("アノテーション", annotation);

  const fetchFeedBack = async (feedBack: Feedback) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pred/feedback`,
        feedBack,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log("data", data);

      return data; // This would be your fetched data
    } catch (error) {
      console.error("Error fetching point data:", error);
      return null; // Handle error appropriately
    } finally {
    }
  };

  const countSubmit = async () => {
    await setFeedBack((prev) => ({
      ...prev,
      after: annotation,
    }));
    const newFeedBack = {
      ...feedBack,
      after: annotation,
    };
    await fetchFeedBack(newFeedBack);
    onClose();
    setMode("video");
    // setTotalCounts((prev) => [...prev, annotation.points.length]);
    // await setAnnotation((prev) => ({
    //   ...prev,
    //   points: [],
    // }));
  };

  return (
    <>
      {/* <button
        onClick={onOpen}
        className={`${style.buttonLayout} w-1/2 flex items-center justify-center h-[40px]`}
      >
        <p className="text-center">フィードバック</p>
      </button> */}
      <BigButton
        className={`${style.legasyssColor} w-full mt-4`}
        onClick={onOpen}
      >
        この画像をフィードバック
      </BigButton>

      <ModalOverlay isOpen={isOpen} onClose={onClose}>
        <ModalContainer
          className="bg-white p-2 mx-2 max-w-sm w-full"
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalHeader
            className="px-2 py-4 flex items-center"
            onClose={onClose}
          >
            <p className="font-semibold text-lg px-4">
              この図面画像をレポート送信します。
            </p>
          </ModalHeader>
          <ModalBody className="px-2 pb-4 min-h-10 flex items-center justify-center">
            <p className="text-start px-4">
              レポート送信すると今後の分析改善につながります。
            </p>
          </ModalBody>
          <ModalFooter className="px-2 py-4">
            <div className="flex items-center justify-end -mr-1 gap-8a">
              <button
                onClick={countSubmit}
                className=" text-white bg-blue-600 hover:bg-blue-500 min-w-[80px] h-[32px] mx-1"
              >
                <p className={`text-sm mb-[2px]`}>送信</p>
              </button>
              <button
                onClick={onClose}
                className="border border-black bg-white hover:bg-gray-100 min-w-[80px] h-[32px] px-4 mx-1"
              >
                <p className="mx-1 font-medium text-sm mb-[2px]">キャンセル</p>
              </button>
            </div>
          </ModalFooter>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default ReportButton;
