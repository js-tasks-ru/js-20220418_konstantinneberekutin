export default class SliderLabel {
  _value;
  boundary;
  formatValue;
  _element;

  constructor(value, formatValue, boundary) {
    this.boundary = boundary;
    this.formatValue = formatValue;
    this._element = this.createElement();
    this.update(value);
  }

  get element() {
    return this._element;
  }

  get value() {
    return this._value;
  }

  get formattedValue() {
    return this.formatValue(this._value);
  }

  createElement() {
    const element = document.createElement('span');
    element.dataset.element = this.boundary;

    return element;
  }

  update(value) {
    this._value = value;

    if (this._element) {
      this._element.innerHTML = this.formatValue(this._value);
    }
  }

  destroy() {
    if (!this._element) {
      return;
    }

    this._element.remove();
    this._element = null;
  }
}
