import clsx from "clsx";

export default function MediumText({ extraClass, children }) {
  return (
    <h5
      className={clsx(
        "text-xl font-semibold tracking-tight",
        "text-gray-900",
        "dark:text-white",
        extraClass
      )}
    >
      {children}
    </h5>
  );
}
