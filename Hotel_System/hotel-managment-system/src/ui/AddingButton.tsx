export default function AddingButton({
  isPending,
  nameOfItme,
}: {
  isPending: boolean;
  nameOfItme: string;
}) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
    >
      <i className="fas fa-save mr-2"></i>
      {isPending ? "Saving..." : `${nameOfItme}`}
    </button>
  );
}
