import { format, subYears, addDays, differenceInDays } from "date-fns";

export const TodayDate: string = new Date().toISOString().split("T")[0];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDate = (value: Date) => format(value, "dd/MM/yyyy");
export const formatDate2 = (value: Date) => format(value, "yyyy-MM-dd");
export const addDaysToDate = (date: Date, days: number) => addDays(date, days);
export const getDifferenceInDays = (
  date1: Date | string,
  date2: Date | string
): number => {
  const firstDate = typeof date1 === "string" ? new Date(date1) : date1;
  const secondDate = typeof date2 === "string" ? new Date(date2) : date2;

  return Math.abs(differenceInDays(firstDate, secondDate));
};

export const formatMinDate = (value: Date) =>
  format(subYears(value, 24), "yyyy-MM-dd");

export function setMaxLength(max: number, field: string) {
  return {
    value: max,
    message: `The length of ${field} must be ${max} characters or fewer.`,
  };
}
