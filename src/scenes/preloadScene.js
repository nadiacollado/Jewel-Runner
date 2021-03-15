class PreloadScene extends Phaser.Scene {
  constructor() {
    super({key: 'preloadScene'})
  }

  preload(value) {
    this.load.image('sky', '../assets/backgrounds/sky.png')
    for (let i = 0; i < 500; i++) {
      this.load.image('sky' + i, '../assets/backgrounds/sky.png')
    }
    let progressBar = new Phaser.Geom.Rectangle(300, 280, 400, 40)
    let progressBarFill = new Phaser.Geom.Rectangle(300, 280, 200 * value, 40)

    this.graphics = this.add.graphics()
    this.newGraphics = this.add.graphics()

    this.graphics.fillStyle(0xffffff, 1)
    this.graphics.fillRectShape(progressBar)

    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(progressBarFill)

    let loadingText = this.add.text(385, 230, 'Loading: ', {
      fontFamily: 'Tomarik Display',
      fontSize: '32px',
      fill: '#FFF'
    })

    let hoosier = this.add.text(0, 0, 'mock text', {
      font: 'Hoosier Dadddy',
      fill: '#FFF'
    })
    hoosier.visible = false

    let stud = this.add.text(0, 0, 'mock text', {font: 'Stud', fill: '#FFFFFF'})
    stud.visible = false

    this.load.on('progress', this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText: loadingText,
      hoosier: hoosier,
      stud: stud
    })

    this.load.on('complete', this.complete, {
      scene: this.scene
    })

    this.load.image('sky', '../assets/backgrounds/sky.png')
    for (let i = 0; i < 500; i++) {
      this.load.image('sky' + i, '../assets/backgrounds/sky.png')
    }
  }

  updateBar(value) {
    this.newGraphics.clear()
    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(300, 280, 200 * value, 40)
    )
    this.loadingText.setText('Loading: ' + parseInt(value * 100) + '%')
  }

  complete() {
    this.scene.start('titleScene')
  }
}

export default PreloadScene
