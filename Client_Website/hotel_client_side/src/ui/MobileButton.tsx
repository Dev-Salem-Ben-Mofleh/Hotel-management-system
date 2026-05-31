import "../index.css";
type MobileNavbarProps = {
  Show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
function MobileButton({ Show, setShow }: MobileNavbarProps) {
  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setShow(!Show)}
        className=" p-2 text-gray-700 hover:text-yellow-700"
        id="mobileMenuBtn"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default MobileButton;
