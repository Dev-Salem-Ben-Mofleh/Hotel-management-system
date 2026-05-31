export default function CancelButton({
  isPending,
  onCloseModule,
}: {
  isPending: boolean;
  onCloseModule: () => void;
}) {
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={onCloseModule}
      className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
    >
      Cancel
    </button>
  );
}
