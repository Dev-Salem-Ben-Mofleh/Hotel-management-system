import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useSearchVisitors() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const _personRepository = useMemo(() => new PersonRepository(), []);
  const column: string = searchParams.get("SearchtBy") || "";
  const value: string = searchParams.get("visitorSearch") || "";
  const operation: string =
    column === "personId" ? Operations.EQUAL : Operations.STARTS_WITH;

  const shouldFetchVisitors = value !== "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "searchPersons",
      pageNumber,
      PAGE_SIZE,
      column,
      value,
      operation,
    ],
    queryFn: async () => {
      const [count, persons] = await Promise.all([
        _personRepository.count("CountPersons", column, value, operation),
        _personRepository.getPersonsUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          value,
          operation
        ),
      ]);
      return { count, persons };
    },
    enabled: shouldFetchVisitors,
  });

  const searchVisitors = data?.persons || [];
  const countSearchVisitors: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countSearchVisitors / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchPersons",
          pageNumber + 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          _personRepository.getPersonsUsingPageNumber(
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
          "searchPersons",
          pageNumber - 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          _personRepository.getPersonsUsingPageNumber(
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
    countSearchVisitors,
    _personRepository,
    queryClient,
  ]);

  return { isLoading, error, searchVisitors, countSearchVisitors };
}
