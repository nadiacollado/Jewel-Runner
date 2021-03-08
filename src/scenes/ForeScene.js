let player
let cursors
let score = 0
let text
let timedEvent
let gameOver = false
let gameOverText
let youWon = false
let youWonText
let scoreKeeper
let greenjewels
let purplejewels
let pinkjewels
let bluejewels
let redhearts
let blackstars
let pop

class ForeScene extends Phaser.Scene {
  constructor() {
    super({key: 'foreScene'})
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../assets/tilemaps/level1.json')
    this.load.image('tiles', '../assets/tilesets/platformPack_tilesheet.png')
    this.load.image('redheart', '../assets/sprites/redheart.png')
    this.load.image('bluejewel', '../assets/sprites/bluejewel.png')
    this.load.image('greenjewel', '../assets/sprites/greenjewel.png')
    this.load.image('purplejewel', '../assets/sprites/purplejewel.png')
    this.load.image('pinkjewel', '../assets/sprites/pinkjewel.png')
    this.load.image('blackstar', '../assets/sprites/blackstar.png')
    this.load.audio('pop', '../assets/audio/pop.ogg')
    this.load.spritesheet('ani', '../assets/spriteSheets/ani_spritesheet.png', {
      frameWidth: 50,
      frameHeight: 141
    })
  }

  create() {
    this.add.image(500, 300, 'sky')
    pop = this.sound.add('pop', {loop: false})
    const map = this.make.tilemap({key: 'map'})
    const tileset = map.addTilesetImage('simple_platformer', 'tiles')
    const platforms = map.createStaticLayer('platforms', tileset, -64, -360)

    player = this.physics.add.sprite(100, 450, 'ani')

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)
    platforms.setCollisionByExclusion(-1, true)

    // PLAYER ANIMATIONS
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('ani', {
        start: 1,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [
        {
          key: 'ani',
          frame: 0
        }
      ],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('ani', {
        start: 3,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys()

    // JEWELS

    // bluejewels = this.physics.add.group({
    //   key: 'bluejewel',
    //   repeat: 1,
    //   setXY: {
    //     x: 500,
    //     y: 5,
    //     stepX: 180
    //   }
    // })

    // bluejewels.children.iterate(function(child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.5, 1))
    // })

    // greenjewels = this.physics.add.group({
    //   key: 'greenjewel',
    //   repeat: 1,
    //   setXY: {
    //     x: 500,
    //     y: 5,
    //     stepX: 50
    //   }
    // })

    // greenjewels.children.iterate(function(child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.5, 1))
    // })

    // // purplejewels = this.physics.add.group({
    // //   key: 'purplejewel',
    // //   repeat: 1,
    // //   setXY: {
    // //     x: 300,
    // //     y: 5,
    // //     stepX: 250
    // //   }
    // // })

    // // purplejewels.children.iterate(function(child) {
    // //   child.setBounceY(Phaser.Math.FloatBetween(0.5, 1))
    // // })

    // pinkjewels = this.physics.add.group({
    //   key: 'pinkjewel',
    //   repeat: 1,
    //   setXY: {
    //     x: 200,
    //     y: 5,
    //     stepX: 210
    //   }
    // })

    // pinkjewels.children.iterate(function(child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.5, 1))
    // })

    redhearts = this.physics.add.group({
      key: 'redheart',
      repeat: 2,
      setXY: {
        x: 100,
        y: 5,
        stepX: 70
      }
    })

    redhearts.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.5, 1.25))
    })

    blackstars = this.physics.add.group({
      key: 'blackstar',
      repeat: 2,
      setXY: {
        x: 300,
        y: 5,
        stepX: 80
      }
    })

    blackstars.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.5, 1.25))
    })

    // SCORE
    scoreKeeper = this.add.text(16, 16, 'score: 0', {
      fontFamily: 'Tomarik Display',
      fontSize: '23px',
      fill: '#000000'
    })

    // COLLIDER
    this.physics.add.collider(player, platforms)
    // this.physics.add.collider(platforms, greenjewels)
    // this.physics.add.collider(platforms, bluejewels)
    // this.physics.add.collider(platforms, purplejewels)
    // this.physics.add.collider(platforms, pinkjewels)
    this.physics.add.collider(platforms, redhearts)
    this.physics.add.collider(platforms, blackstars)

    // this.physics.add.overlap(player, bluejewels, this.runJewels, null, this)
    // this.physics.add.overlap(player, greenjewels, this.runJewels, null, this)
    // this.physics.add.overlap(player, purplejewels, this.runJewels, null, this)
    // this.physics.add.overlap(player, pinkjewels, this.runJewels, null, this)
    this.physics.add.overlap(player, redhearts, this.runHearts, null, this)
    this.physics.add.overlap(player, blackstars, this.runStars, null, this)

    // TIMER
    this.initialTime = 15

    text = this.add.text(
      740,
      16,
      'Countdown: ' + this.formatTime(this.initialTime),
      {
        fontFamily: 'Tomarik Display',
        fontSize: '23px',
        fill: '#000000'
      }
    )

    timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.onEvent,
      callbackScope: this,
      loop: true
    })
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-200)
      player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      player.setVelocityX(200)
      player.anims.play('right', true)
    } else {
      player.setVelocityX(0)
      player.anims.play('turn')
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-600)
    }

    let children = redhearts.children.getArray()
    // console.log(children)
    if (this.initialTime > 0 && children.length < 1) {
      timedEvent.remove()
      this.physics.pause()
      player.anims.play('turn')
      youWon = true
      youWonText = this.add.text(320, 220, 'YOU\n WON', {
        fontFamily: 'Stud',
        fontSize: '100px',
        fill: '#ff0000'
      })
    }
  }

  runJewels(player, jewel) {
    pop.play()
    jewel.disableBody(true, true)
    score += 100
    scoreKeeper.setText(`Score: ${score}`)
  }

  runHearts(player, heart) {
    pop.play()
    heart.disableBody(true, true)
    score += 500
    player.setScale(1.5)
    scoreKeeper.setText(`Score: ${score}`)
  }

  runStars(player, star) {
    pop.play()
    star.disableBody(true, true)
    score -= 100
    player.setScale(1)
    scoreKeeper.setText(`Score: ${score}`)
  }

  formatTime(seconds) {
    let minutes = Math.floor(seconds / 60)
    let partInSeconds = seconds % 60
    partInSeconds = partInSeconds.toString().padStart(2, '0')
    return `${minutes}:${partInSeconds}`
  }

  onEvent() {
    this.initialTime -= 1 // One second
    text.setText('Countdown: ' + this.formatTime(this.initialTime))

    if (this.initialTime === 0) {
      timedEvent.remove()
      this.physics.pause()
      player.anims.play('turn')
      gameOver = true
      gameOverText = this.add.text(320, 220, 'GAME\n OVER', {
        fontFamily: 'Stud',
        fontSize: '50px',
        fill: '#ff0000'
      })
    }
  }
}

export default ForeScene
