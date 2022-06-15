export default class DomHandler {
  static hasDOM() {
    return !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    );
  }

  static getBrowserLanguage() {
    return (
      navigator.language ||
      (navigator.languages &&
        navigator.languages.length &&
        navigator.languages[0]) ||
      navigator.language ||
      navigator.language ||
      navigator.language ||
      'en'
    );
  }
}
