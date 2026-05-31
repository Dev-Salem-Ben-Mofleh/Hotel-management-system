type ErrorProps = {
  message: string | undefined;
};

function Error({ message }: ErrorProps) {
  if (!message) return null;

  return (
    <div
      className="
        mt-2
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-red-200
        bg-red-50
        px-3
        py-2
        text-sm
        text-red-700

        dark:border-red-800
        dark:bg-red-950/40
        dark:text-red-300
      "
    >
      <i className="fas fa-circle-exclamation"></i>

      <span>{message}</span>
    </div>
  );
}

export default Error;
