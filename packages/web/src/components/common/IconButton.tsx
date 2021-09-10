interface Props {
  disabled?: boolean;
  children: JSX.Element;
  onClick?: () => void;
}
const IconButton = ({
  children,
  disabled = false,
  onClick,
}: Props): JSX.Element => {
  return (
    <button
      className={
        "rounded-full w-min p-2 " +
        (disabled
          ? "text-gray-300 cursor-not-allowed"
          : "hover:bg-gray-200 hover:bg-opacity-50")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IconButton;
