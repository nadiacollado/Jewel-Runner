import Phaser, {Game} from 'phaser'
import ForeScene from './scenes/foreScene'
import PreloadScene from './scenes/preloadScene'
import TitleScene from './scenes/titleScene'

let preloadScene = new PreloadScene()
let titleScene = new TitleScene()
let foreScene = new ForeScene()

const canvas = document.getElementById('game-canvas')

const config = {
  type: Phaser.WEB_GL,
  width: 1000,
  height: 600,
  autoCenter: true,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 500},
      debug: false
    }
  }
}

const game = new Game(config)
game.scene.add('preloadScene', preloadScene)
game.scene.add('titleScene', titleScene)
game.scene.add('foreScene', foreScene)
game.scene.start('preloadScene')
