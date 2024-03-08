import { useState, useCallback } from "react";

const useDisclosure = () => {
  // 状態を管理するためのstate。isOpenがtrueの場合、コンテンツが表示され、falseの場合は非表示になります。
  const [isOpen, setIsOpen] = useState(false);

  // コンテンツを非表示にするための関数。
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // コンテンツを表示するための関数。
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  // コンテンツの表示/非表示をトグルするための関数。
  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // 制御されたコンポーネントのpropsを提供する関数。
  // "aria-hidden"と"aria-expanded"の属性を追加して、アクセシビリティを向上させます。
  const getDisclosureProps = useCallback(
    (props = {}) => ({
      ...props,
      "aria-hidden": !isOpen,
      "aria-expanded": isOpen,
    }),
    [isOpen]
  );

  // 開示をトリガーするボタンのプロパティを提供する関数。
  // "aria-controls"と"aria-expanded"の属性とonClickイベントを追加して、アクセシビリティと機能性を向上させます。
  const getButtonProps = useCallback(
    (props = {}) => ({
      ...props,
      "aria-controls": "disclosure",
      "aria-expanded": isOpen,
      onClick: onToggle,
    }),
    [isOpen, onToggle]
  );

  // カスタムフックから返されるオブジェクト。
  return {
    isOpen, // 現在の表示状態を示すブール値。
    onClose, // コンテンツを非表示にする関数。
    onOpen, // コンテンツを表示する関数。
    onToggle, // コンテンツの表示/非表示を切り替える関数。
    getDisclosureProps, // 制御されたコンポーネントのpropsを取得する関数。
    getButtonProps, // 開示をトリガーするボタンのpropsを取得する関数。
  };
};

export default useDisclosure;
