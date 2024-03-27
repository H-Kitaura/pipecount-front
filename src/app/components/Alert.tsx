type Props = {
  alertType: string;
  alertMessage: string;
};

const Alert = ({ alertType, alertMessage }: Props) => {
  return (
    <div
      className={`${alertType} my-3 py-1 px-2 rounded-lg text-md font-bold h-auto text-white text-center `}
      role="alert"
    >
      {alertMessage}
    </div>
  );
};

export default Alert;
