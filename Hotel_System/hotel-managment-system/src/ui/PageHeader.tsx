interface Data {
  nameOfPage: string;
  description: string;
}
export default function PageHeader({ nameOfPage, description }: Data) {
  return (
    <div className="mb-6">
      <h2
        className="
            mb-2
            text-2xl sm:text-3xl
            font-bold
            text-gray-900 dark:text-white
          "
      >
        {nameOfPage}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
