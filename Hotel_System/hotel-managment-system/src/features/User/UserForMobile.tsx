import { useModuleContext } from "../../context/Hook/useModuleContext";
import type { UserView } from "../../services/models/User";

interface Data {
  allUsers: UserView[];
}
const className: string = "text-gray-900 dark:text-white text-sm mb-1";
export default function UserForMobile({ allUsers }: Data) {
  const { setModalType, setOpenId } = useModuleContext();

  return (
    <div className="md:hidden space-y-4">
      {allUsers.map((u) => (
        <div
          key={u.userId}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className={className}>ID: {u.userId}</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Name: {u.personDto.fullName}
          </div>
          <div className={className}>Phone: {u.email}</div>
          <div className={className}>Country: {u.role}</div>
          <div className="flex space-x-2">
            <button
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              onClick={() => {
                setOpenId(u.userId);
                setModalType("view");
              }}
            >
              <i className="fas fa-eye mr-1"></i>View
            </button>
            <button
              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm"
              onClick={() => {
                setOpenId(u.userId);
                setModalType("update");
              }}
            >
              <i className="fas fa-edit mr-1"></i>Update
            </button>
            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
              onClick={() => {
                setOpenId(u.userId);
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
