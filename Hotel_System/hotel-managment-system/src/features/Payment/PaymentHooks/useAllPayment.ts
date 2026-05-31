import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { PaymentRepository } from "../../../services/Repository/PaymentRepository";

export function useAllPayment() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const paymentRepository = useMemo(() => new PaymentRepository(), []);
  const filterValue: string = searchParams.get("filterValue") || "";
  const column: string = searchParams.get("filterBy") || "";
  const operation: string = filterValue !== "all" ? Operations.EQUAL : "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: [
      "payments",
      pageNumber,
      PAGE_SIZE,
      column,
      filterValue,
      operation,
    ],
    queryFn: async () => {
      const [count, payments] = await Promise.all([
        paymentRepository.count("CountPayment", column, filterValue, operation),
        paymentRepository.getPaymentsUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ),
      ]);
      return { count, payments };
    },
  });
  const payments = data?.payments || [];
  const countPayments: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countPayments / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "payments",
          pageNumber + 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          paymentRepository.getPaymentsUsingPageNumber(
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
          "payments",
          pageNumber - 1,
          PAGE_SIZE,
          column,
          filterValue,
          operation,
        ],
        queryFn: () =>
          paymentRepository.getPaymentsUsingPageNumber(
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
    countPayments,
    paymentRepository,
    queryClient,
    column,
    filterValue,
    operation,
  ]);

  return { isLoading, isFetching, error, payments, countPayments };
}
