import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import VisitorForMobile from "./UserForMobile";
import Pagination from "../../ui/Pagination";
import { useAllUsers } from "./UserHooks/useAllUsers";
import { useSearchUser } from "./UserHooks/useSearchUser";
import EmptyData from "../../ui/EmptyData";
import RowTable from "../Shared/RowTable";
import ListOfUsers from "./ListOfUsers";

export default function UserTable() {
  const { isLoading, isFetching, users, countUsers } = useAllUsers();
  const {
    isLoading: isLoading2,
    searchUsers,
    countSearchUsers,
  } = useSearchUser();
  const [searchParams] = useSearchParams();

  const value: string = searchParams.get("userSearch") || "";
  if (isLoading || isLoading2 || isFetching) {
    return <Spinner />;
  }

  if (value !== "" && countSearchUsers === 0) {
    return <EmptyData message="No Users with this search" />;
  } else if (!users.length) {
    return <EmptyData message="No Users in database" />;
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4">
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <RowTable
                Rows={[
                  { value: "Full Name" },
                  { value: "ID" },
                  { value: "Email" },
                  { value: "Role" },
                  { value: "Actions" },
                ]}
              />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <ListOfUsers allUsers={searchUsers.length ? searchUsers : users} />
          </tbody>
        </table>
      </div>
      <VisitorForMobile allUsers={searchUsers.length ? searchUsers : users} />
      <Pagination
        count={countSearchUsers === 0 ? countUsers : countSearchUsers}
      />
    </div>
  );
}
