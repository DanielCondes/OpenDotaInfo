export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`px-3 py-2 border rounded-lg bg-gray-800 text-white border-gray-600 ${className}`}
    />
  );
}