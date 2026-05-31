interface Props<T> {
  resourceName: string;
  onConfirm: (variables: T) => void;
  onCloseModal: () => void;
  disabled?: boolean;
  isLoading: boolean;
  modalType: string | null;
  openId: number;
}

export default function ConfirmDelete<T>({
  resourceName,
  onConfirm,
  isLoading,
  onCloseModal,
  modalType,
  openId,
}: Props<T>) {
  if (openId === 0 || modalType !== "delete") return null;

  return (
    <div
      onClick={onCloseModal}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-[40rem]
          rounded-2xl
          p-6
          shadow-xl
          flex flex-col gap-4

          bg-white text-gray-900
          dark:bg-gray-800 dark:text-white
          transition-colors duration-300
        "
      >
        {/* Close button */}
        <button
          onClick={onCloseModal}
          className="
            absolute top-4 right-4
            text-gray-500 hover:text-gray-700

            dark:text-gray-400 dark:hover:text-gray-200
          "
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold">{`Delete ${resourceName}`}</h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300">
          {`Are you sure you want to delete this ${resourceName} permanently? This action cannot be undone.`}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            disabled={isLoading}
            onClick={onCloseModal}
            className="
              px-4 py-2
              border rounded-md

              border-gray-300 text-gray-700 hover:bg-gray-100

              dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700

              disabled:opacity-50
              transition-colors
            "
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={() => {
              onConfirm({} as T);
              onCloseModal();
            }}
            className="
              px-4 py-2
              rounded-md
              text-white
              bg-red-600 hover:bg-red-700

              dark:bg-red-700 dark:hover:bg-red-800

              disabled:opacity-50
              transition-colors
            "
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
