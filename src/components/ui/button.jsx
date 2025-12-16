export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white ${className}`}
    >
      {children}
    </button>
  );
}