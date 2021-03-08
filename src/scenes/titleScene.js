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
    let sky = this.add.image(700, 450, 'sky').setScale(1)
    this.add.image(700, 700, 'bluejewel').setScale(3)
    this.add.image(90, 205, 'greenjewel').setScale(3)
    this.add.image(900, 90, 'purplejewel').setScale(3)

    let welcome = this.add.text(90, 120, '     Welcome to \nJEWEL-RUNNER!', {
      fontFamily: 'Hoosier Daddy',
      fontSize: '85px',
      fill: '#ff40fc'
    })

    let instructions = this.add.text(
      275,
      340,
      'Collect as many jewels as you can \n  before time runs out! Watch out \n for hearts which give 5x as many \n    points and ~~special powers~~',
      {
        fontFamily: 'Tomarik Display',
        fontSize: '36px',
        fill: '#ff9100'
      }
    )

    let play = this.add.text(385, 560, 'CLICK TO PLAY!', {
      fontFamily: 'Tomarik Display',
      fontSize: '60px',
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
