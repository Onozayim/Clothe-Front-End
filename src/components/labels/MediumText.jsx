export default function MediumText({extraClass, children }) {
  return (
    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {children}
    </h5>
  );
}
