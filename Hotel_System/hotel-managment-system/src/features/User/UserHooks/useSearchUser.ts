import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { UserRepository } from "../../../services/Repository/UserRepository";

export function useSearchUser() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const _userRepository = useMemo(() => new UserRepository(), []);
  const column: string = searchParams.get("SearchtBy") || "";
  const value: string = searchParams.get("userSearch") || "";
  const operation: string =
    column === "userId" ? Operations.EQUAL : Operations.STARTS_WITH;

  const shouldFetchUsers = value !== "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: ["searchUsers", pageNumber, PAGE_SIZE, column, value, operation],
    queryFn: async () => {
      const [count, users] = await Promise.all([
        _userRepository.count("CountUsers", column, value, operation),
        _userRepository.getUsersUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          value,
          operation
        ),
      ]);
      return { count, users };
    },
    enabled: shouldFetchUsers,
  });

  const searchUsers = data?.users || [];
  const countSearchUsers: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countSearchUsers / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchUsers",
          pageNumber + 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          _userRepository.getUsersUsingPageNumber(
            pageNumber + 1,
            PAGE_SIZE,
            column,
            value,
            operation
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchUsers",
          pageNumber - 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          _userRepository.getUsersUsingPageNumber(
            pageNumber - 1,
            PAGE_SIZE,
            column,
            value,
            operation
          ),
      });
    }
  }, [
    pageNumber,
    value,
    column,
    operation,
    countSearchUsers,
    _userRepository,
    queryClient,
  ]);

  return { isLoading, error, searchUsers, countSearchUsers };
}
