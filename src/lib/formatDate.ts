import moment from "moment";

export function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = moment(dateString);
  if (!date.isValid()) return "";
  return date.format("DD MMMM YYYY");
}
