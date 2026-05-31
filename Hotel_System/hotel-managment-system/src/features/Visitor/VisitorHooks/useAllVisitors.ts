import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { PersonRepository } from "../../../services/Repository/PersonRepository";

export function useAllVisitors() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const _personRepository = useMemo(() => new PersonRepository(), []);
  const filterValue: string = searchParams.get("filterValue") || "";
  const column: string = searchParams.get("filterBy") || "";
  const operation: string = filterValue !== "all" ? Operations.EQUAL : "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: [
      "persons",
      pageNumber,
      PAGE_SIZE,
      column,
      filterValue,
      operation,
    ],
    queryFn: async () => {
      const [count, persons] = await Promise.all([
        _personRepository.count("CountPersons", column, filterValue, operation),
        _personRepository.getPersonsUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ),
      ]);
      return { count, persons };
    },
  });
  const visitors = data?.persons || [];
  const countVisitors: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countVisitors / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "persons",
          pageNumber + 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          _personRepository.getPersonsUsingPageNumber(
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
          "persons",
          pageNumber - 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          _personRepository.getPersonsUsingPageNumber(
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
    countVisitors,
    _personRepository,
    queryClient,
    column,
    filterValue,
    operation,
  ]);

  return { isLoading, isFetching, error, visitors, countVisitors };
}
