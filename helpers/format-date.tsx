function formatDate(date: string) {
  return `${new Date(date).toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })}`;
}

export default formatDate;
