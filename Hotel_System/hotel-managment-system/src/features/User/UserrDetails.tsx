import { useModuleContext } from "../../context/Hook/useModuleContext";
import Spinner from "../../ui/Spinner";
import VisitorCard from "../Visitor/VisitorCard";
import UserCard from "./UserCard";
import { useGetUser } from "./UserHooks/useGetUser";

export default function UserrDetails() {
  const { onCloseModuleMenu, modalType, openId, countries } =
    useModuleContext();
  const { isLoading, userDetails } = useGetUser(openId, modalType);

  if (openId === 0 || modalType !== "viewUser") return null;

  return isLoading ? (
    <div
      onClick={onCloseModuleMenu}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Spinner />;
    </div>
  ) : (
    <div
      onClick={onCloseModuleMenu}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <i className="fas fa-user-circle text-blue-500 text-3xl"></i>
            User Details
          </h3>

          <button
            onClick={onCloseModuleMenu}
            className="text-white hover:scale-110 transition"
          >
            <i className="fas fa-times text-3xl"></i>
          </button>
        </div>

        <div
          onClick={onCloseModuleMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <i className="fas fa-id-badge text-blue-500 text-2xl"></i>
                User Details
              </h3>

              <button
                onClick={onCloseModuleMenu}
                className="text-white hover:scale-110 transition"
              >
                <i className="fas fa-xmark text-3xl"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
                  <i className="fas fa-user text-white text-4xl"></i>
                </div>

                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {userDetails?.personDto?.fullName || "Visitor Name"}
                </h4>

                <p className="text-gray-600 dark:text-gray-400 mt-1 flex justify-center items-center gap-2">
                  <i className="fas fa-globe text-blue-400"></i>
                  {countries.find(
                    (country) =>
                      country.countryId ===
                      userDetails?.personDto?.nationalityCountryId,
                  )?.countryName || "Nationality"}
                </p>
              </div>
              <VisitorCard
                visitorDetails={userDetails?.personDto}
                countries={countries}
              />
              <UserCard userDetails={userDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
