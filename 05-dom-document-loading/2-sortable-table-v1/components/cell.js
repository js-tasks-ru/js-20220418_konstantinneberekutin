export default class Cell {
  value;
  template;
  id
  _element;

  constructor({
    value,
    template = null,
    id
  }) {
    this.value = value;
    this.template = template;
    this.id = id;

    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  createElement() {
    if (typeof this.template === 'function') {
      return document.createRange().createContextualFragment(this.template(this.value));
    }

    const element = document.createElement('div');
    element.classList.add('sortable-table__cell');
    element.innerHTML = this.value;

    return element;
  }
}
