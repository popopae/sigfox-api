class DateTimeHelper {
  public static convertNumberToDate(item: number): string {
    const date: Date = new Date(item * 1000);
    return date.toUTCString();
  }
}

export default DateTimeHelper;
