export function formatDateto(inputDate: string) {
  const months = [
    "tháng 01",
    "tháng 02",
    "tháng 03",
    "tháng 04",
    "tháng 05",
    "tháng 06",
    "tháng 07",
    "tháng 08",
    "tháng 09",
    "tháng 10",
    "tháng 11",
    "tháng 12",
  ];
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  if (inputDate !== undefined) {
    const date = new Date(inputDate);
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayOfWeek}, ${dayOfMonth} ${month}, ${year}`;
  }
  return null;
}

export function getDecimalDigit(number: number) {
  const decimalPart = number % 1;
  const digit = Math.floor(decimalPart * 10);
  return digit;
}
