interface Props {
  variant: "ok" | "cancel";
  disabled?: boolean;
  text: string;
  onClick?: () => void;
}

const DialogButton = ({
  variant,
  disabled = false,
  text,
  onClick,
}: Props): JSX.Element => {
  return (
    <button
      className={
        "border-2 rounded-full py-2 px-4 text-lg " +
        (!disabled
          ? variant === "ok"
            ? "border-green-500 bg-green-200 hover:bg-green-300 text-green-700"
            : "border-red-500 bg-red-200 hover:bg-red-300 text-red-700"
          : "border-gray-500 bg-gray-200 text-gray-700 cursor-not-allowed")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default DialogButton;
