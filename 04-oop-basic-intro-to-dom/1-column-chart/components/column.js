export default class Column {
  value;
  percent;
  _element;

  constructor(value, percent) {
    this.percent = percent;
    this.value = value;
    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  createElement() {
    const column = document.createElement('div');
    column.style.setProperty('--value', String(this.value));
    column.setAttribute('data-tooltip', `${this.percent}%`);
    return column;
  }
}
