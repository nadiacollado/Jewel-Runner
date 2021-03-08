import {Scene} from 'phaser'

class BackScene extends Scene {
  constructor() {
    super('back-scene')
  }

  preload() {
    this.load.image('sky', '../assets/backgrounds/sky.png')
  }
  create() {}
}

export default BackScene
