export default function CardDashbord({
  nameCard,
  valueCard,
  iconCard,
  className,
}: {
  nameCard: string;
  valueCard: string;
  iconCard: string;
  className: string;
}) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-100">{nameCard}</p>

          <p className="mt-1 text-3xl font-bold">{valueCard}</p>
        </div>

        <div
          className="
                rounded-full
                bg-white/20
                p-3
                backdrop-blur-sm
              "
        >
          <i className={`${iconCard}`}></i>
        </div>
      </div>
    </div>
  );
}
