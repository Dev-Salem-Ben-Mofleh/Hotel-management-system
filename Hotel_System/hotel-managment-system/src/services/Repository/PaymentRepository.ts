import { BASE_URL } from "../../utils/constants";
import type { Payment, PaymentView } from "../models/Payment";
import fetchData from "./FetchAPI";
import { GenericRepository } from "./GenericRepository";

export class PaymentRepository extends GenericRepository<Payment> {
  constructor(apiUrl: string = `${BASE_URL}/Payment`) {
    super(apiUrl);
  }

  async getPaymentsUsingPageNumber(
    pageNumber: number,
    pageSize: number,
    column: string,
    value: string,
    Operations: string,
  ): Promise<PaymentView[]> {
    const allPayments: PaymentView[] = await fetchData<PaymentView[]>(
      column !== "" && value !== "" && Operations !== ""
        ? `${this.apiUrl}/PaymentsUsingPageNumber/${pageNumber}/${pageSize}/${column}/${value}/${Operations}`
        : `${
            this.apiUrl
          }/PaymentsUsingPageNumber/${pageNumber}/${pageSize}/${null}/${null}/${null}`,
    );
    return allPayments;
  }

  async existsPayment(id: number): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsPayment/${id}`,
    );
    return result;
  }
}
