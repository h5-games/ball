import Engine from './Engine';
import Ball, { BallInterface } from './Ball';

const game = new Engine(document.body);
game.createUnit<BallInterface>(new Ball(), 'ball');

async function getResources() {
  const resources = await Engine.loadResource([
    {
      id: 1,
      src: '/static/images/terr.png'
    }
  ]);
  console.log(resources);
}

getResources();
