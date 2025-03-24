export default function ErrorLabel({ children }) {
  return (
    <div className="text-red-800  dark:text-red-400" role="alert">
      <span className="font-medium">{children}</span>
    </div>
  );
}
