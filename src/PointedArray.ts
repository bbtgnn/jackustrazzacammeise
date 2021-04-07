import { mod } from "./mod";

export class PointedArray<T> {
  private _items: Array<T>;
  private _current: T;

  constructor(items: Array<T> = []) {
    this._items = items;
  }

  m(n: number): number {
    return mod(n, this._items.length);
  }

  push(item: T): void {
    this._items.push(item);
  }

  get length(): number {
    return this._items.length;
  }

  get current(): T {
    return this._current ? this._current : this._items[0];
  }

  get currentIndex(): number {
    return this._items.indexOf(this.current);
  }

  nextIndex(increase = 1): number {
    return this.m(this.currentIndex + increase);
  }

  prevIndex(decrease = 1): number {
    return this.m(this.currentIndex - decrease);
  }

  setCurrentByIndex(index: number): T {
    this._current = this._items[this.m(index)];
    return this.current;
  }

  setCurrent(item: T): T {
    this._current = this._items[this._items.indexOf(item)];
    return item;
  }

  next(increase = 1): T {
    return this._items[this.nextIndex(increase)];
  }

  prev(decrease = 1): T {
    return this._items[this.prevIndex(decrease)];
  }

  increase(): T {
    this._current = this.next();
    return this.current;
  }

  decrease(): T {
    this._current = this.prev();
    return this.current;
  }

  get items(): Array<T> {
    return this._items;
  }

  get otherItems(): PointedArray<T> {
    return new PointedArray(this._items.filter((item) => item != this.current));
  }

  removeItem(item: T): void {
    this._items.splice(this._items.indexOf(item), 1);
  }

  getItem(index: number): T {
    return this._items[this.m(index)];
  }
}
