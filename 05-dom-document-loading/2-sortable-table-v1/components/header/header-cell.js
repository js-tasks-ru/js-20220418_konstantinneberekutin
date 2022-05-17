import {SortDirection} from "../../index.js";

export default class HeaderCell {
  sortable;
  title;
  direction;
  id;
  sorted;
  _element;

  constructor({ title, id, sorted = false, sortable = true, direction = SortDirection.ASC }) {
    this.title = title;
    this.id = id;
    this.direction = direction;
    this.sortable = sortable;
    this.sorted = sorted;

    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  get id() {
    return this.id;
  }

  get sorted() {
    return this.sorted;
  }

  update(sorted, order = SortDirection.ASC) {
    if (sorted === this.sorted && this.direction === order) {
      return;
    }

    this.sorted = sorted;
    this._element.setAttribute('data-order', order);
    this.injectContent(this._element);
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('sortable-table__cell');
    element.setAttribute('data-id', this.id);
    element.setAttribute('data-sortable', String(this.sortable));
    if (this.sorted) {
      element.setAttribute('data-order', this.direction);
    }
    this.injectContent(element);

    return element;
  }

  injectContent(element) {
    element.innerHTML = `
      <span>${this.title}</span>
      ${this.sorted ? `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>` : ''}
    `;
  }

}
