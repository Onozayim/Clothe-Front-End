import clsx from "clsx";

export default function DefaultButton({ type, children, extraClass = "" }) {
  console.log(extraClass);
  return (
    <button
      type={type}
      className={clsx(
        "text-white  font-medium rounded-lg text-sm py-2  w-full",
        "dark:bg-blue-600 dark:hover:bg-blue-700",
        "bg-blue-700 hover:bg-blue-800",
        extraClass,
      )}
    >
      {children}
    </button>
  );
}
