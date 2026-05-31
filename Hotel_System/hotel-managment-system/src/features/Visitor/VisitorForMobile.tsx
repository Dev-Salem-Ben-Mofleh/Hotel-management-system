import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { PersonView } from "../../services/models/Persons";

interface Data {
  allVisitors: PersonView[];
}
const className: string = "text-gray-900 dark:text-white text-sm mb-1";
export default function VisitorForMobile({ allVisitors }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <div className="md:hidden space-y-4">
      {allVisitors.map((v) => (
        <div
          key={v.personId}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className={className}>ID: {v.personId}</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Name: {v.fullName}
          </div>
          <div className={className}>Phone: {v.phone}</div>
          <div className={className}>Gender: {v.gender}</div>
          <div className={className}>Country: {v.countryDto.countryName}</div>
          <div className={className}>
            Birth Date:
            {v.birthDate ? new Date(v.birthDate).toLocaleDateString() : "-"}
          </div>
          <div className="flex space-x-2">
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              onClick={() => {
                setOpenId(v.personId);
                setModalType("view");
              }}
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
              onClick={() => {
                setOpenId(v.personId);
                setModalType("update");
              }}
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
              onClick={() => {
                setOpenId(v.personId);
                setModalType("delete");
              }}
            >
              <i className="fas fa-trash mr-1"></i>Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
