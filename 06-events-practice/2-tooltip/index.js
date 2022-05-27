class Tooltip {
  static DX = 20;
  static DY = 20;

  static _instance;
  element;
  _show;
  _hide;
  _move;

  _inDocument = false;

  constructor() {
    if (typeof Tooltip._instance === 'object') {
      return Tooltip._instance;
    }

    this.element = this.createElement();

    this._show = this.show.bind(this);
    this._hide = this.hide.bind(this);
    this._move = this.move.bind(this);

    Tooltip._instance = this;

    return Tooltip._instance;
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('tooltip');

    return element;
  }

  initialize () {
    this.addEvents();
  }

  addEvents() {
    window.addEventListener('pointerover', this._show);
  }

  move({ clientX, clientY }) {
    if (!this.element || !this._inDocument) {
      return;
    }

    this.setPosition(clientX, clientY);
  }

  show({ target, clientX, clientY }) {
    if (!this.element) {
      return;
    }

    const tooltip = target.dataset.tooltip;
    if (!tooltip) {
      return;
    }

    this.element.innerHTML = tooltip;
    this.setPosition(clientX, clientY);

    target.addEventListener('pointermove', this._move);
    target.addEventListener('pointerout', this._hide);

    this.render();
  }

  hide({ target }) {
    if (!this.element || !this._inDocument) {
      return;
    }

    target.removeEventListener('pointermove', this._move);
    target.removeEventListener('pointerout', this._hide);
    this.element.innerHTML = '';
    this.element.remove();
    this._inDocument = false;
  }

  render() {
    if (this._inDocument) {
      return;
    }

    this._inDocument = true;
    document.body.append(this.element);
  }

  destroy() {
    window.removeEventListener('pointerover', this._show);
    Tooltip.instance = null;
    this.element.remove();
    this._inDocument = false;
  }

  setPosition(x, y) {
    if (!this.element) {
      return;
    }

    this.element.style.left = x + Tooltip.DX + 'px';
    this.element.style.top = y + Tooltip.DY + 'px';
  }
}

export default Tooltip;
