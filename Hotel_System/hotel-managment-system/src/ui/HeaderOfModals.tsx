export default function HeaderOfModals({
  description,
  icon,
}: {
  description: string;
  icon: string;
}) {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-center items-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <i className={icon}></i>
        {description}
      </h3>
    </div>
  );
}
