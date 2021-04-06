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

  get currentIndex(): number {
    return this._items.indexOf(this._current);
  }

  nextIndex(increase = 1): number {
    return this.m(this.currentIndex + increase);
  }

  prevIndex(decrease = 1): number {
    return this.m(this.currentIndex - decrease);
  }

  get current(): T {
    return this._current ? this._current : this._items[0];
  }

  setCurrent(index: number): T {
    this._current = this._items[this.m(index)];
    return this.current;
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

  get otherItems(): PointedArray<T> {
    return new PointedArray(this._items.filter((item) => item != this.current));
  }

  // increasePointer(increase = 1): PointedArray<T> {
  //   this.pointer = this.pointer + increase;
  //   return this;
  // }

  // decreasePointer(decrease = 1): PointedArray<T> {
  //   this.pointer = this.pointer - decrease;
  //   return this;
  // }

  // increaseItem(): T {
  //   return this.increasePointer().currentItem;
  // }

  // decreaseItem(): T {
  //   return this.decreasePointer().currentItem;
  // }

  // removeItem(item: T): void {
  //   this._items.splice(this._items.indexOf(item), 1);
  // }

  // getItem(index: number): T {
  //   return this._items[mod(index, this.length)];
  // }
}
