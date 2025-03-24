import clsx from "clsx";

export default function Label({ children }) {
  return (
    <label
      className={clsx(
        "text-sm/6 font-medium",
        "dark:text-white",
        "text-gray-700"
      )}
    >
      {children}
    </label>
  );
}
