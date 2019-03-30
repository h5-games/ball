/// <reference path="index.d.ts"/>
import { computedPixe } from './utils';

export default class Ball implements BallInterface {
  left = 0;
  top = 0;
  direction = true;
  radius = 0;
  color = '#b7e8e8';
  space = 0;
  degree = 0;
  maxDegree = 50;
  minDegree = -50;

  constructor(config: BallConfigInterface) {
    Object.assign(this, config)
  }

  move(isTouch) {
    const { space, direction, degree, maxDegree, minDegree } = this;

    if (isTouch) {
      if (direction) {
        const _degree = degree - computedPixe(1);
        this.degree = _degree < minDegree ? minDegree : _degree;
      } else {
        const _degree = degree + computedPixe(1);
        this.degree = _degree > maxDegree ? maxDegree : _degree;
      }
    }

    this.top += (Math.cos(this.degree * Math.PI/180) * space);
    this.left += (Math.sin(this.degree * Math.PI/180) * space);
  }
}
