import clsx from "clsx";

export default function Input({
  type,
  name,
  value = null,
  extraClass = "",
  onChange = function () {},
  maxValue = null,
  minValue = null,
  placeholder = null
}) {
  return (
    <input
      className={clsx(
        extraClass,
        "mt-3 block w-full rounded-lg border-none py-1.5 px-3 text-sm/6",
        "dark:text-white dark:bg-white/5",
        "text-gray-700 bg-gray-200"
      )}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...(maxValue ? { max: maxValue } : "")}
      {...(minValue || minValue === 0 ? { min: minValue } : "")}
    />
  );
}
