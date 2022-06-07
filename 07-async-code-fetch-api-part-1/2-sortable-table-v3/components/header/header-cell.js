import {SortDirection} from "../../index.js";

export default class HeaderCell {
  sortable;
  title;
  direction;
  _id;
  _sorted;
  _element;

  constructor({ title, id, sorted = false, sortable = true, direction = SortDirection.ASC }) {
    this.title = title;
    this._id = id;
    this.direction = direction;
    this.sortable = sortable;
    this._sorted = sorted;
    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  get sorted() {
    return this._sorted;
  }

  update(sorted, order = SortDirection.ASC) {
    if (sorted === this._sorted && this.direction === order) {
      return;
    }

    this._sorted = sorted;
    this._element.setAttribute('data-order', order);
    this.injectContent(this._element);
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('sortable-table__cell');
    element.dataset.id = this._id;
    element.dataset.sortable = String(this.sortable);
    if (this._sorted) {
      element.dataset.order = this.direction;
    }
    this.injectContent(element);

    return element;
  }

  injectContent(element) {
    element.innerHTML = `
      <span>${this.title}</span>
      ${this._sorted ? `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>` : ''}
    `;
  }
}
