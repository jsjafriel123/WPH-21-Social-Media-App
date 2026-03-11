export function timeAgo(dateString: string): string {
  const now = new Date();
  const created = new Date(dateString);

  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (seconds < minute) return "Just now";
  if (seconds < hour) return `${Math.floor(seconds / minute)}m`;
  if (seconds < day) return `${Math.floor(seconds / hour)}h`;
  if (seconds < week) return `${Math.floor(seconds / day)}d`;
  if (seconds < month) return `${Math.floor(seconds / week)}w`;
  if (seconds < year) return `${Math.floor(seconds / month)}mo`;

  return `${Math.floor(seconds / year)}y`;
}
