import { differenceInHours, format } from "date-fns";

export class DateUtil {
  constructor() {}
  public static formatDate(date: Date, newFormat: string): string {
    return format(new Date(date), newFormat);
  }

  public static differenceInHours(dateLeft: Date, dateRigth: Date): number {
    return differenceInHours(dateLeft, dateRigth);
  }
}
