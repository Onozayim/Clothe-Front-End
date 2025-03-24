import clsx from "clsx";

export default function Title({ children }) {
  return (
    <h1
      className={clsx(
        "text-base text-center font-bold text-title",
        "dark:text-white",
        "text-gray-900"
      )}
    >
      {children}
    </h1>
  );
}
