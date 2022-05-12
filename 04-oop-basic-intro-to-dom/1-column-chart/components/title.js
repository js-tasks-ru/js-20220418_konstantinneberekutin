import Link from "./link.js";

export default class Title {
  title;
  link;
  _element;

  constructor({ title, link }) {
    this.link = link;
    this.title = title;

    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  createElement() {
    const titleBlock = document.createElement('div');
    titleBlock.classList.add('column-chart__title');

    titleBlock.innerHTML = this.title;
    if (this.link) {
      const link = new Link(this.link);
      titleBlock.append(link.element);
    }

    return titleBlock;
  }
}
