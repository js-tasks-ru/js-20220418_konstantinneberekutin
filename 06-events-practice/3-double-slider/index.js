import SliderLabel from "./components/slider-label.js";
import SliderProgressBar from "./components/slider-progress-bar.js";
import SliderThumb from "./components/slider-thumb.js";

export const ThumbType = {
  FROM: 'from',
  TO: 'to'
};

export default class DoubleSlider {
  _min;
  _max;
  formatValue;
  _from;
  _to;
  _element;
  body;
  _subElements;
  onDragStart;
  onInput;
  onChange;

  constructor({
    min = 0,
    max = 100,
    formatValue = value => value,
    selected = null
  } = {}) {
    this._min = min;
    this._max = max;
    this.formatValue = formatValue;
    this._from = selected?.from ?? min;
    this._to = selected?.to ?? max;

    this.onDragStart = this.handleDragStart.bind(this);
    this.onInput = this.handleInput.bind(this);
    this.onChange = this.handleChange.bind(this);
    this.init();
  }

  get element() {
    return this._element;
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  get subElements() {
    return this._subElements;
  }

  init() {
    this._subElements = {
      labels: {
        [ThumbType.FROM]: new SliderLabel(this._from, this.formatValue, ThumbType.FROM),
        [ThumbType.TO]: new SliderLabel(this._to, this.formatValue, ThumbType.TO),
      },
      progress: new SliderProgressBar((this._from / this._max) * 100, (this._to / this._max) * 100),
      thumbs: {
        [ThumbType.FROM]: new SliderThumb({
          value: this._from,
          min: this._min,
          max: this._to,
          length: this._max - this._min,
          type: ThumbType.FROM,
          onDragStart: this.onDragStart,
          onInput: this.onInput,
          onChange: this.onChange
        }),
        [ThumbType.TO]: new SliderThumb({
          value: this._to,
          min: this._from,
          max: this._max,
          length: this._max - this._min,
          type: ThumbType.TO,
          onDragStart: this.onDragStart,
          onInput: this.onInput,
          onChange: this.onChange
        }),
      }
    };

    this._element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add("range-slider");

    const body = document.createElement('div');
    body.classList.add('range-slider__inner');

    const {
      labels: { from: labelFrom, to: labelTo },
      progress,
      thumbs: { from, to }
    } = this._subElements;

    body.append(progress.element, from.element, to.element);

    this.body = body;

    element.append(labelFrom.element, body, labelTo.element);

    return element;
  }

  handleDragStart() {
    const { from, to } = this._subElements.thumbs;
    from.dragging = false;
    to.dragging = false;
    this._element.classList.add('range-slider_dragging');
  }

  handleInput(value, type) {
    const { progress, thumbs, labels } = this._subElements;
    if (!progress || !thumbs) {
      return;
    }
    const percent = (value / (this._max - this._min)) * 100;

    if (type === ThumbType.FROM) {
      thumbs[ThumbType.TO].update({ min: value });
      labels[ThumbType.FROM].update(value);
    }

    if (type === ThumbType.TO) {
      thumbs[ThumbType.FROM].update({ max: value });
      labels[ThumbType.TO].update(value);
    }

    progress.update({
      from: type === ThumbType.FROM ? percent : undefined,
      to: type === ThumbType.TO ? percent : undefined
    });
  }

  handleChange({ from, to }) {
    const { from: fromThumb, to: toThumb } = this._subElements.thumbs;
    this._element.classList.remove('range-slider_dragging');
    fromThumb.dragging = false;
    toThumb.dragging = false;

    this._from = from;
    this._to = to;

    const event = new CustomEvent('range-select', {
      detail: { from: this._from, to: this._to }
    });

    this._element.dispatchEvent(event);
  }

  destroy() {
    if (!this._element) {
      return;
    }

    const { progress, labels, thumbs } = this._subElements;

    if (labels) {
      labels[ThumbType.FROM].destroy();
      labels[ThumbType.TO].destroy();
    }

    if (thumbs) {
      thumbs[ThumbType.FROM].destroy();
      thumbs[ThumbType.TO].destroy();
    }

    if (progress) {
      progress.destroy();
    }

    this._element.remove();

    this._subElements = {};
  }
}
