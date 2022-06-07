export default class Link {
  link
  label
  _element

  constructor(link = '#', label = 'View all') {
    this.link = link;
    this.label = label;
    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  createElement() {
    const link = document.createElement('a');
    link.innerText = this.label;
    link.classList.add('column-chart__link');
    link.setAttribute('href', this.link);

    return link;
  }
}
