import "../index.css";

function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-lg">H</span>
      </div>
      <div>
        <h1 className="text-xl font-bold text-yellow-700">Heritage Hotel</h1>
      </div>
    </div>
  );
}
export default Logo;
