interface Row {
  value: string;
}

interface Data {
  Rows: Row[];
}
export default function RowTable({ Rows }: Data) {
  return (
    <>
      {Rows.map((Row) => (
        <th
          key={Row.value}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
        >
          {Row.value}
        </th>
      ))}
    </>
  );
}
