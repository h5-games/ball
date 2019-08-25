import { ResourceInterface, UnitsInterface } from './types';
import Animation from './Animation';

class Engine {
  public devicePixelRatio: number = 1;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public units: UnitsInterface = {};

  constructor(public container: HTMLElement) {
    const devicePixelRatio: number = window.devicePixelRatio || 1;
    const { offsetWidth, offsetHeight } = container;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.style.width = `${offsetWidth}px`;
    canvas.style.height = `${offsetHeight}px`;
    canvas.width = offsetWidth * devicePixelRatio;
    canvas.height = offsetHeight * devicePixelRatio;
    container.appendChild(canvas);

    this.devicePixelRatio = devicePixelRatio;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  public createUnit<T>(unit: T, id?: string): string {
    const _id = id ? id : `_${Math.floor(Math.random() * 1000000000 + 899909999)}`;
    this.units[_id] = {
      _id,
      unit
    };
    return id;
  }

  public deleteUnit(id: string): void {
    delete this.units[id];
  }

  static async loadResource(
    resources: Array<ResourceInterface>,
    callback?: {
      (progress: number): void
    }
  ): Promise<Array<ResourceInterface>> {
    let _resources: Array<ResourceInterface> = [];
    for (let i = 0; i < resources.length; i++) {
      const res: ResourceInterface = await new Promise(resolve => {
        const img: HTMLImageElement = new Image();
        img.src = resources[i].src;
        img.onload = function () {
          callback && callback((i + 1) / resources.length);
          resolve({
            ...resources[i],
            resource: img,
            status: 'resolve'
          });
        };
        img.onerror = function () {
          callback && callback((i + 1) / resources.length);
          resolve({
            ...resources[i],
            resource: img,
            status: 'reject'
          });
        };
      });
      _resources.push(res);
    }
    return _resources;
  }

  public startGame() {
    return new Animation();
  }
}

export default Engine;
