interface Data {
  name: string;
  onClick: () => void;
}
export default function AddNewButton({ name, onClick }: Data) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
    >
      <i className="fas fa-plus mr-2"></i>Add New {name}
    </button>
  );
}
