export default class SliderProgressBar {
  from;
  to;
  _element;

  constructor(from, to) {
    this._element = this.createElement();
    this.update({ from, to });
  }

  get element() {
    return this._element;
  }

  update({ from, to }) {
    this.from = typeof from !== 'undefined' ? from : this.from;
    this.to = typeof to !== 'undefined' ? to : this.to;

    this.setPercentage();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('range-slider__progress');

    return element;
  }

  setPercentage() {
    if (!this._element) {
      return;
    }

    this._element.style.left = this.from + '%';
    this._element.style.right = (100 - this.to) + '%';
  }

  destroy() {
    if (!this._element) {
      return;
    }

    this._element.remove();
    this._element = null;
  }
}
