class PreloadScene extends Phaser.Scene {
  constructor() {
    super({key: 'preloadScene'})
  }

  preload(value) {
    this.graphics = this.add.graphics()
    this.newGraphics = this.add.graphics()
    let progressBar = new Phaser.Geom.Rectangle(400, 370, 500, 50)
    let progressBarFill = new Phaser.Geom.Rectangle(400, 370, 300 * value, 50)

    this.graphics.fillStyle(0xffffff, 1)
    this.graphics.fillRectShape(progressBar)

    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(progressBarFill)

    let loadingText = this.add.text(530, 280, 'Loading: ', {
      fontFamily: 'Tomarik Display',
      fontSize: '32px',
      fill: '#FFF'
    })

    this.load.image('sky', '../assets/backgrounds/sky.png')
    for (let i = 0; i < 500; i++) {
      this.load.image('sky' + i, '../assets/backgrounds/sky.png')
    }

    this.load.on('progress', this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText: loadingText
    })

    this.load.on('complete', this.complete, {
      scene: this.scene
    })
  }

  updateBar(value) {
    this.newGraphics.clear()
    this.newGraphics.fillStyle(0x3587e2, 1)
    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(400, 370, 300 * value, 50)
    )
    this.loadingText.setText('Loading: ' + parseInt(value * 100) + '%')
  }

  complete() {
    this.scene.start('titleScene')
  }
}

export default PreloadScene
