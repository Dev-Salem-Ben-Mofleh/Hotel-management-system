export default function EmptyData({ message }: { message: string }) {
  return (
    <span className="block text-lg font-medium text-gray-700 my-16 text-center ">
      {message}
    </span>
  );
}
