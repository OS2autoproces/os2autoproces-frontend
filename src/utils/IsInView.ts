interface WatchELement {
  element: HTMLElement;
  callBack(): void;
}

class Watcher {
  windowHeight = 0;
  elementsToWatch: any[] = [];
  scrollListener: any;
  reziseListener: any;

  constructor() {
    this.scrollListener = this.update.bind(this);
    this.reziseListener = this.resize.bind(this);
    window.addEventListener("scroll", this.scrollListener);
    window.addEventListener("resize", this.reziseListener);
    this.resize();
    this.update();
  }

  update() {
    const viewPortTop = window.pageYOffset;
    const viewPortBottom = viewPortTop + window.innerHeight;

    this.elementsToWatch.forEach((elementBinding: any) => {
      const { element, settings } = elementBinding;

      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = element.offsetTop + element.clientHeight;

      const isInView =
        elementTopPosition + 100 < viewPortBottom &&
        elementBottomPosition > viewPortTop + 100;

      settings.callback(element, isInView);
    });
  }

  resize() {
    this.windowHeight = window.innerHeight;
    this.update();
  }

  addElement(element: HTMLElement, settings = {}) {
    this.elementsToWatch.push({
      element,
      settings
    });
  }

  removeListeners() {
    window.removeEventListener("resize", this.reziseListener);
    window.removeEventListener("scroll", this.scrollListener);
  }
}

export const watcher = new Watcher();
