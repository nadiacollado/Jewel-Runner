class TitleScene extends Phaser.Scene {
  constructor() {
    super({key: 'titleScene'})
  }

  preload() {
    this.load.image('sky', '/src/assets/backgrounds/sky.png')
    this.load.image('bluejewel', '../assets/sprites/bluejewel.png')
    this.load.image('greenjewel', '../assets/sprites/greenjewel.png')
    this.load.image('purplejewel', '../assets/sprites/purplejewel.png')
  }

  create() {
    let sky = this.add.image(500, 300, 'sky')
    this.add.image(800, 400, 'bluejewel').setScale(3)
    this.add.image(90, 205, 'greenjewel').setScale(3)
    this.add.image(900, 90, 'purplejewel').setScale(3)

    let style = {font: '70px Verdana', fill: '#ff40fc', align: 'center'}

    let welcome = this.add.text(
      110,
      95,
      '     Welcome to \n    JEWEL-RUNNER!',
      style
    )

    let instructions = this.add.text(
      280,
      300,
      'Collect as many jewels as you can \n   before time runs out! Pick up \n   hearts for 2x as many points\n and watch out for death stars!',
      {
        fontFamily: 'Tomarik Display',
        fontSize: '23px',
        fill: '#ff9100'
      }
    )

    let play = this.add.text(380, 460, 'CLICK TO PLAY!', {
      fontFamily: 'Tomarik Display',
      fontSize: '30px',
      fill: '#FF5714'
    })

    play.setInteractive({useHandCursor: true})
    play.on('pointerdown', () => this.clickButton())
  }

  clickButton() {
    this.scene.switch('foreScene')
  }
}

export default TitleScene
