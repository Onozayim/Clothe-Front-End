import clsx from "clsx";

export default function Href({ url, children, extraClass = "" }) {
  return (
    <a
      href={url}
      className={clsx(
        "dark:text-blue-400",
        "text-blue-900",
        "text-center w-full block",
        extraClass
      )}
    >
      {children}
    </a>
  );
}
