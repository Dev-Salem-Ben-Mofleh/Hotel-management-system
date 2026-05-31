interface FieldProps {
  FieldName: string;
  icon: string;
  value?: string;
}
export default function Field({ FieldName, icon, value }: FieldProps) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
        <i className={icon}></i>
        {FieldName}:
      </span>
      <span className="font-semibold text-gray-900 dark:text-white">
        {!value ? "no data" : value}
      </span>
    </div>
  );
}
