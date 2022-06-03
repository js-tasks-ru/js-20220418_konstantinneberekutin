export default class Loading {
  _element;

  constructor() {
    this._element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('loading-line');
    element.classList.add('sortable-table__loading-line');
    element.dataset.element = 'Loading';

    return element;
  }

  get element() {
    return this._element;
  }

  destroy() {
    this.remove();
    this._element = null;
  }

  remove() {
    if (!this._element) {
      return;
    }

    this._element.remove();
  }
}
