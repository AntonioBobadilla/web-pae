function FormatTime(time: number) {
  return `${time.toString()}:00 - ${(time + 1).toString()}:00`;
}
export default FormatTime;
