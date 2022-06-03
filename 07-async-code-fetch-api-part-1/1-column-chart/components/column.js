export default class Column {
  value
  tooltip
  _element

  constructor(value, tooltip) {
    this.value = value;
    this.tooltip = tooltip;
    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  createElement() {
    const column = document.createElement('div');
    column.style.setProperty('--value', String(this.value));
    column.setAttribute('data-tooltip', `${this.tooltip}`);
    return column;
  }
}
