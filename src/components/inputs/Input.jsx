import clsx from "clsx";

export default function Input({ type, name }) {
  return (
    <input
      className={clsx(
        "mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6",
        "dark:text-white dark:bg-white/5",
        "text-gray-700 bg-gray-200"
      )}
      type={type}
      name={name}
    />
  );
}
