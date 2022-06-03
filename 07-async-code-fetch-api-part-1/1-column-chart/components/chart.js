import Column from "./column.js";

export default class Chart {
  data
  height
  _element

  constructor(data, height) {
    this.height = height;

    this._element = this.createElement();
    this.update();
  }

  get element() {
    return this._element;
  }

  update(data = null) {
    this.data = this.createData(data ?? this.data);
    this._element.innerHTML = '';
    this._element.append(...this.getColumnNodes());
  }

  createElement() {
    const chart = document.createElement('div');
    chart.classList.add('column-chart__chart');
    chart.setAttribute('data-element', 'body');

    return chart;
  }

  createData(data) {
    if (!data || !Object.values(data).length) {
      return [];
    }

    const entries = Object.entries(data);

    const max = Math.max(...entries.map(([, value]) => Number(value)));
    const scale = this.height / max;
    return entries.map(([label, value]) => ({
      value: String(Math.floor(value * scale)),
      label
    }));
  }

  getColumnNodes() {
    return this.data.map(({ value, label }) => {
      const { element } = new Column(value, label);
      return element;
    });
  }
}
