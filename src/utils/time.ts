import moment from "moment";

export function formatedTime(duration: number): string {
  const currentTime = moment.duration(duration);

  return moment.utc(currentTime.asMilliseconds()).format("HH:mm:ss:SS");
}
