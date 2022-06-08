function createDate(date: string, hour: number): Date {
  return new Date(`${date}T${hour < 10 ? 0 : ''}${hour}:00`);
}

export default createDate;
