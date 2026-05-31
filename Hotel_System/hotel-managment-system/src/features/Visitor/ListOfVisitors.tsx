import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { PersonView } from "../../services/models/Persons";

interface Data {
  allVisitors: PersonView[];
}
const className =
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white";
export default function ListOfVisitors({ allVisitors }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <>
      {allVisitors.map((v) => (
        <tr
          key={v.personId}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td className={className}>{v.fullName}</td>
          <td className={className}>{v.personId}</td>
          <td className={className}>{v.phone}</td>
          <td className={className}>
            {v.birthDate ? new Date(v.birthDate).toLocaleDateString() : "-"}
          </td>
          <td className={className}>{v.gender}</td>
          <td className={className}>{v.countryDto.countryName}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button
              onClick={() => {
                setOpenId(v.personId);
                setModalType("view");
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              onClick={() => {
                setOpenId(v.personId);
                setModalType("update");
              }}
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              onClick={() => {
                setOpenId(v.personId);
                setModalType("delete");
              }}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              <i className="fas fa-trash mr-1"></i>Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
