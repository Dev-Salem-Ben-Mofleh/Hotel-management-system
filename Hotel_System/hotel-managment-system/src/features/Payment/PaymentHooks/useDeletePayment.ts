import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PaymentRepository } from "../../../services/Repository/PaymentRepository";

export function useDeletePayment() {
  const queryClient = useQueryClient();
  const paymentRepository = new PaymentRepository();

  const { isPending: isDeleting, mutate: deletePayment } = useMutation({
    mutationFn: async ({ paymentId }: { paymentId: number }) => {
      return await paymentRepository.delete("DeletePayment", paymentId);
    },
    onSuccess: () => {
      toast.success("payment successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
    onError: (err) => {
      const errorMessage =
        err?.message || "An error occurred while deleting the room.";
      toast.error(`Deletion failed: ${errorMessage}`);
    },
  });

  return { isDeleting, deletePayment };
}
