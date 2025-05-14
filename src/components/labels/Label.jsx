import clsx from "clsx";

export default function Label({
  children,
  extraClassName = "",
  onClick = function () {},
}) {
  return (
    <label
      className={clsx(
        "text-sm/6 font-medium",
        "dark:text-white",
        "text-gray-700",
        extraClassName
      )}
      onClick={onClick}
    >
      {children}
    </label>
  );
}
