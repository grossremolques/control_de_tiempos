export default function Badge({ text, icon, color }) {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 ${colorClasses[color]} text-sm font-medium`}>
      {icon}
      <p className="text-sm whitespace-nowrap">{text}</p>
    </span>
  );
}
