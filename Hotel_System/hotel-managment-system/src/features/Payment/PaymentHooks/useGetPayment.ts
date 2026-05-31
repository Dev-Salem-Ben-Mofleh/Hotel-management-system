import { useQuery } from "@tanstack/react-query";
import { PaymentRepository } from "../../../services/Repository/PaymentRepository";

export function useGetPayment(
  paymentId: number | undefined,
  modalType: string | null,
) {
  const paymentRepository = new PaymentRepository();
  const {
    isLoading,
    data: paymentDetails,
    error,
  } = useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => paymentRepository.getById("FindPayment", paymentId),
    enabled: !!paymentId && (modalType === "view" || modalType === "update"),
  });
  return { isLoading, error, paymentDetails };
}
