export default class Container {
  header
  chart
  _element

  constructor(header, chart) {
    this.header = header;
    this.chart = chart;

    this._element = this.createElement();
  }

  get element() {
    return this._element;
  }

  createElement() {
    const container = document.createElement('div');
    container.classList.add('column-chart__container');

    container.append(this.header.element, this.chart.element);

    return container;
  }
}
