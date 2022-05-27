import HeaderCell from "./header-cell.js";
import {SortDirection} from "../../index.js";

export default class Header {
  cells;
  _element;
  onClick;
  _handleChangeSort

  constructor(columns = [], {
    onClick
  }) {
    this.cells = columns.map(Header.mapConfigToCell);
    this._element = this.createElement();
    this.onClick = onClick.bind(this);
    this._handleChangeSort = this.handleChangeSort.bind(this);

    this.setListener();
  }

  get element() {
    return this._element;
  }

  get children() {
    return this.cells.map(cell => cell.element);
  }

  createElement() {
    const element = document.createElement('div');
    element.setAttribute('data-element', 'header');
    element.classList.add('sortable-table__header');
    element.classList.add('sortable-table__row');

    element.append(...this.cells.map(cell => cell.element));

    return element;
  }

  updateSort(sort = null) {
    this.resetSort();
    if (!sort) {
      return;
    }

    const cell = this.cells.find(cell => cell.id === sort.id);

    if (!cell) {
      return;
    }

    cell.update(true, sort.direction);
  }

  resetSort() {
    const sortedColumn = this.cells.find(cell => cell.sorted);

    if (!sortedColumn) {
      return;
    }

    sortedColumn.update(false);
  }

  setListener() {
    if (!this._element) {
      return;
    }

    this._element.addEventListener('pointerdown', this._handleChangeSort);
  }

  handleChangeSort(event) {
    const cell = event.target.closest('[data-id]');
    const sortable = cell?.dataset.sortable;
    if (!sortable || sortable === 'false') {
      return;
    }

    const id = cell.dataset.id;
    const order = cell.dataset.order;

    this.onClick(id, !order || order === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC);
  }

  static mapConfigToCell(config) {
    const { title, id, sortable } = config;
    return new HeaderCell({ title, id, sortable });
  }

  destroy() {
    this._element.removeEventListener('pointerdown', this._handleChangeSort);
  }
}
