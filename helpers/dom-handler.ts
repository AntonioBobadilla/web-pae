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

  static alignOverlay(
    overlay,
    target,
    appendTo = 'self',
    calculateMinWidth = true
  ) {
    if (overlay && target) {
      if (appendTo === 'self') {
        this.relativePosition(overlay, target);
      } else {
        calculateMinWidth &&
          (overlay.style.minWidth = `${DomHandler.getOuterWidth(target)}px`);
        this.absolutePosition(overlay, target);
      }
    }
  }

  static getOuterWidth(el, margin) {
    if (el) {
      let width = el.offsetWidth || el.getBoundingClientRect().width;

      if (margin) {
        const style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }

      return width;
    }
    return 0;
  }

  static getWindowScrollTop() {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  static getWindowScrollLeft() {
    const doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  static getViewport() {
    const win = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const w = win.innerWidth || e.clientWidth || g.clientWidth;
    const h = win.innerHeight || e.clientHeight || g.clientHeight;

    return { width: w, height: h };
  }

  static absolutePosition(element, target) {
    if (element) {
      const elementDimensions = element.offsetParent
        ? { width: element.offsetWidth, height: element.offsetHeight }
        : this.getHiddenElementDimensions(element);
      const elementOuterHeight = elementDimensions.height;
      const elementOuterWidth = elementDimensions.width;
      const targetOuterHeight = target.offsetHeight;
      const targetOuterWidth = target.offsetWidth;
      const targetOffset = target.getBoundingClientRect();
      const windowScrollTop = this.getWindowScrollTop();
      const windowScrollLeft = this.getWindowScrollLeft();
      const viewport = this.getViewport();
      let top;
      let left;

      if (
        targetOffset.top + targetOuterHeight + elementOuterHeight >
        viewport.height
      ) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        if (top < 0) {
          top = windowScrollTop;
        }
        console.log('bottom');
        element.style.transformOrigin = 'bottom';
      } else {
        console.log('top');
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
        element.style.transformOrigin = 'top';
      }

      if (
        targetOffset.left + targetOuterWidth + elementOuterWidth >
        viewport.width
      )
        left = Math.max(
          0,
          targetOffset.left +
            windowScrollLeft +
            targetOuterWidth -
            elementOuterWidth
        );
      else left = targetOffset.left + windowScrollLeft;

      element.style.top = `${top}px`;
      element.style.left = `${left}px`;
    }
  }

  static getHiddenElementDimensions(element) {
    const dimensions = {};
    if (element) {
      element.style.visibility = 'hidden';
      element.style.display = 'block';
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = 'none';
      element.style.visibility = 'visible';
    }
    return dimensions;
  }

  static relativePosition(element, target) {
    if (element) {
      const elementDimensions = element.offsetParent
        ? { width: element.offsetWidth, height: element.offsetHeight }
        : this.getHiddenElementDimensions(element);
      const targetHeight = target.offsetHeight;
      const targetOffset = target.getBoundingClientRect();
      const viewport = this.getViewport();
      let top;
      let left;

      if (
        targetOffset.top + targetHeight + elementDimensions.height >
        viewport.height
      ) {
        top = -1 * elementDimensions.height;
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }

        element.style.transformOrigin = 'bottom';
      } else {
        top = targetHeight;
        element.style.transformOrigin = 'top';
      }

      if (elementDimensions.width > viewport.width) {
        // element wider then viewport and cannot fit on screen (align at left side of viewport)
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        // element wider then viewport but can be fit on screen (align at right side of viewport)
        left =
          (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        // element fits on screen (align with target)
        left = 0;
      }

      element.style.top = `${top}px`;
      element.style.left = `${left}px`;
    }
  }
}
