import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { UserRepository } from "../../../services/Repository/UserRepository";

export function useAllUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const _userRepository = useMemo(() => new UserRepository(), []);
  const filterValue: string = searchParams.get("filterValue") || "";
  const column: string = searchParams.get("filterBy") || "";
  const operation: string = filterValue !== "all" ? Operations.EQUAL : "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ["users", pageNumber, PAGE_SIZE, column, filterValue, operation],
    queryFn: async () => {
      const [count, users] = await Promise.all([
        _userRepository.count("CountUsers", column, filterValue, operation),
        _userRepository.getUsersUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ),
      ]);
      return { count, users };
    },
  });
  const users = data?.users || [];
  const countUsers: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countUsers / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "users",
          pageNumber + 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          _userRepository.getUsersUsingPageNumber(
            pageNumber + 1,
            PAGE_SIZE,
            column,
            filterValue,
            operation,
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "users",
          pageNumber - 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          _userRepository.getUsersUsingPageNumber(
            pageNumber - 1,
            PAGE_SIZE,
            column,
            filterValue,
            operation,
          ),
      });
    }
  }, [
    pageNumber,
    countUsers,
    _userRepository,
    queryClient,
    column,
    filterValue,
    operation,
  ]);

  return { isLoading, isFetching, error, users, countUsers };
}
