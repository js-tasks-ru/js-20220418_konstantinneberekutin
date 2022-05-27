import {ThumbType} from "../index.js";

export default class SliderThumb {
  value;
  _type;
  min;
  max;
  length;
  _isDragging;
  onChange;
  onDragStart;
  onInput;
  onMouseDown;
  onMouseMove;
  onMouseUp;
  _element;

  constructor({ value, min, max, length, type, onChange = () => void 0, onDragStart = () => void 0, onInput = () => void 0 }) {
    this.validateType(type);
    this._type = type;
    this._isDragging = false;
    this.length = length;
    this.onChange = onChange;
    this.onDragStart = onDragStart;
    this.onInput = onInput;
    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);
    this._element = this.createElement();
    this.setListeners();
    this.update({ value, min, max });
  }

  get element() {
    return this._element;
  }

  set dragging(isDragging) {
    this._isDragging = isDragging;
  }

  get dragging() {
    return this._isDragging;
  }

  get type() {
    return this._type;
  }

  update({ value, max, min }) {
    if (typeof value !== 'undefined') {
      this.value = value;
    }

    if (typeof min !== 'undefined') {
      this.min = min;
    }

    if (typeof max !== 'undefined') {
      this.max = max;
    }

    if (!this._element) {
      return;
    }

    let percentToSet = (this.value / this.length) * 100;

    const maxPercent = (this.max / this.length) * 100;
    if (percentToSet > maxPercent) {
      percentToSet = maxPercent;
    }

    const minPercent = (this.min / this.length) * 100;
    if (percentToSet < minPercent) {
      percentToSet = minPercent;
    }

    this._element.style.left = percentToSet + '%';
  }

  createElement() {
    const element = document.createElement('span');
    element.classList.add(`range-slider__thumb-${this._type === 'from' ? 'left' : 'right'}`);
    element.dataset.thumb = this._type;

    return element;
  }

  validateType(type) {
    if (type !== 'from' && type !== 'to') {
      throw new Error('Invalid type');
    }
  }

  handleMouseDown() {
    this.onDragStart();
    this._isDragging = true;
  }

  handleMouseMove(event) {
    if (!this.dragging) {
      return;
    }

    event.preventDefault();
    const dx = (event.clientX - this.leftOffset - this.width) /
      (this._element.closest('.range-slider__inner').getBoundingClientRect().width / this.length);

    let newValue = this.calculateNewValue(dx ?? 0);

    this.update({ value: newValue });
    this.onInput(newValue, this.type);
  }

  handleMouseUp(event) {
    if (!this.dragging) {
      return;
    }
    event.preventDefault();
    this.onChange({
      from: this._type === ThumbType.FROM ? this.value : this.min,
      to: this._type === ThumbType.FROM ? this.max : this.value,
    });
  }

  setListeners() {
    if (!this._element) {
      return;
    }

    this._element.addEventListener('pointerdown', this.onMouseDown);
    window.addEventListener('pointermove', this.onMouseMove);
    window.addEventListener('pointerup', this.onMouseUp);
  }

  calculateNewValue(delta) {
    const newValue = this.value + delta;
    if (newValue >= this.max) {
      return this.max;
    }

    if (newValue <= this.min) {
      return this.min;
    }

    return Math.ceil(newValue);
  }

  get leftOffset() {
    if (!this._element) {
      return 0;
    }

    return this._element.getBoundingClientRect().left;
  }

  get width() {
    if (!this._element) {
      return 0;
    }

    return this._element.offsetWidth;
  }

  destroy() {
    if (!this._element) {
      return;
    }

    this._element.removeEventListener('pointerdown', this.onMouseDown);
    window.removeEventListener('pointermove', this.onMouseMove);
    window.removeEventListener('pointerup', this.onMouseUp);
    this._element.remove();
    this._element = null;
  }
}
