/**
 * Định dạng ngày theo kiểu Việt Nam: DD/MM/YYYY
 */
export function formatVietnameseDate(iso: string): string {
  const date = new Date(iso);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Trả về tên thứ trong tuần bằng tiếng Việt.
 */
export function getVietnameseWeekday(iso: string): string {
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return weekdays[new Date(iso).getDay()];
}
