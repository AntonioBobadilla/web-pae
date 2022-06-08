function isTecEmail(email: string) {
  if (email.includes('@tec.mx')) {
    return true;
  }
  return false;
}
export default isTecEmail;
