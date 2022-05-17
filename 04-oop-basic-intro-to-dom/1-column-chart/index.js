import { Title, Header, Chart, Container } from './components';
import EventObserver from "../../lib/event-observer.js";

export default class ColumnChart {
  static height = 50;
  title
  chart
  header
  dataObserver = new EventObserver();
  _element;

  constructor({ label, value, data, link, formatHeading } = {}) {
    this.title = new Title({ title: label, link });
    this.header = new Header(value, formatHeading);
    this.chart = new Chart(data ?? [], ColumnChart.height);

    this.subscribeToDataUpdate();

    this._element = this.createTemplate();
    this.updateLoading(!data?.length);
  }

  get element() {
    return this._element;
  }

  get chartHeight() {
    return ColumnChart.height;
  }

  update(data) {
    this.dataObserver.notify(data);
  }

  destroy() {
    this.remove();
    this.chart = null;
    this.title = null;
    this.header = null;
    this._element = null;
    this.dataObserver = null;
  }

  remove() {
    this.element.remove();
  }

  createTemplate() {
    const element = document.createElement('div');
    element.classList.add('column-chart');

    element.style.setProperty('--chart-height', String(ColumnChart.height));

    const container = new Container(this.header, this.chart);

    element.append(this.title.element);
    element.append(container.element);

    return element;
  }

  updateLoading(loading) {
    if (loading) {
      this._element.classList.add('column-chart_loading');
    } else {
      this._element.classList.remove('column-chart_loading');
    }
  }

  subscribeToDataUpdate() {
    this.dataObserver.subscribe((data) => {
      this.chart.update(data);
      this.updateLoading(!data?.length);
    });
  }
}
