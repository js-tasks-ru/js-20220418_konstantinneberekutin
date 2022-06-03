export default class EmptyPlaceholder {
  _element;
  onReset;
  _handleReset;
  button;

  constructor(onReset = () => void 0) {
    this.onReset = onReset;

    this._element = this.createElement();
    this._handleReset = this.handleReset.bind(this);
    this.setEventListeners();
  }

  get element() {
    return this._element;
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('sortable-table__empty-placeholder');
    element.dataset.element = 'emptyPlaceholder';

    const div = document.createElement('div');
    const p = document.createElement('p');
    p.innerHTML = 'No products satisfies your filter criteria';
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('button-primary-outline');
    button.innerHTML = 'Reset all filters';
    this.button = button;

    div.append(p, button);
    element.append(div);

    return element;
  }

  setEventListeners() {
    this.button.addEventListener('click', this._handleReset);
  }

  handleReset() {
    this.onReset();
  }

  remove() {
    if (!this._element) {
      return;
    }

    this._element.remove();
  }
}
