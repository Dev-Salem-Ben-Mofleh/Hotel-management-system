import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Operations, PAGE_SIZE } from "../../../utils/constants";
import { PaymentRepository } from "../../../services/Repository/PaymentRepository";

export function useSearchPayment() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const paymentRepository = useMemo(() => new PaymentRepository(), []);
  const column: string = searchParams.get("SearchtBy") || "";
  const value: string = searchParams.get("paymentSearch") || "";
  const operation: string =
    column === "paymentId" || column === "bookingId"
      ? Operations.EQUAL
      : Operations.STARTS_WITH;

  const shouldFetchVisitors = value !== "";

  const pageNumber = Number(searchParams.get("page")) || 1;
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "searchPayment",
      pageNumber,
      PAGE_SIZE,
      column,
      value,
      operation,
    ],
    queryFn: async () => {
      const [count, payments] = await Promise.all([
        paymentRepository.count("CountPayment", column, value, operation),
        paymentRepository.getPaymentsUsingPageNumber(
          pageNumber,
          PAGE_SIZE,
          column,
          value,
          operation,
        ),
      ]);
      return { count, payments };
    },
    enabled: shouldFetchVisitors,
  });

  const searchPayments = data?.payments || [];
  const countSearchPayments: number = data?.count || 0;

  useEffect(() => {
    if (pageNumber < Math.ceil(countSearchPayments / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchPayment",
          pageNumber + 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          paymentRepository.getPaymentsUsingPageNumber(
            pageNumber + 1,
            PAGE_SIZE,
            column,
            value,
            operation,
          ),
      });
    }

    if (pageNumber > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "searchPayment",
          pageNumber - 1,
          PAGE_SIZE,
          value,
          column,
          operation,
        ],
        queryFn: () =>
          paymentRepository.getPaymentsUsingPageNumber(
            pageNumber - 1,
            PAGE_SIZE,
            column,
            value,
            operation,
          ),
      });
    }
  }, [
    pageNumber,
    value,
    column,
    operation,
    countSearchPayments,
    paymentRepository,
    queryClient,
  ]);

  return { isLoading, error, searchPayments, countSearchPayments };
}
