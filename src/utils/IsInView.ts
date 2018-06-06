interface Target {
  element: HTMLElement;
  callback(element: HTMLElement, isInView: boolean): void;
}

export class Watcher {
  margin = 100;
  targets: Target[] = [];
  listener = this.update.bind(this);

  constructor() {
    window.addEventListener("scroll", this.listener);
    window.addEventListener("resize", this.listener);
    this.update();
  }

  update() {
    const viewPortTop = window.pageYOffset;
    const viewPortBottom = viewPortTop + window.innerHeight;

    this.targets.forEach(target => {
      const { element, callback } = target;

      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = element.offsetTop + element.clientHeight;

      const isElementTopOverScreenBottom =
        elementTopPosition + this.margin < viewPortBottom;

      const isElementBottomBelowScreenTop =
        elementBottomPosition > viewPortTop + this.margin;

      const isInView =
        isElementTopOverScreenBottom && isElementBottomBelowScreenTop;

      callback(element, isInView);
    });
  }

  addElement(element: Target['element'], callback: Target['callback']): void {
    this.targets.push({ element, callback });
  }

  removeListeners(): void {
    window.removeEventListener("resize", this.listener);
    window.removeEventListener("scroll", this.listener);
  }
}
