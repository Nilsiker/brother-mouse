import React from 'react'
import './App.css';
import * as ROT from 'rot-js'
import { Player } from './Entities';


const UP = { x: 0, y: -1 }
const DOWN = { x: 0, y: 1 }
const LEFT = { x: -1, y: 0 }
const RIGHT = { x: 1, y: 0 }
const UP_LEFT = { x: -1, y: -1 }
const UP_RIGHT = { x: 1, y: -1 }
const DOWN_LEFT = { x: -1, y: 1 }
const DOWN_RIGHT = { x: 1, y: 1 }
const FREE_CELL = '.'
const WALL = '■'
const MOVEMENT = { 'w': UP, 'a': LEFT, 's': DOWN, 'd': RIGHT, 1: DOWN_LEFT, 2: DOWN, 3: DOWN_RIGHT, 4: LEFT, 6: RIGHT, 7: UP_LEFT, 8: UP, 9: UP_RIGHT }

const WIDTH = 38
const HEIGHT = 30


class App extends React.Component {
  map = {}
  freeCells: string[] = []
  display: ROT.Display
  player: Player

  constructor() {
    super({})

    this.display = new ROT.Display({
      width: WIDTH,
      height: HEIGHT,
      fontSize: 20,
      forceSquareRatio: true
    })

    this.player = new Player()
  }

  generateMap() {
    var digger = new ROT.Map.Rogue(WIDTH, HEIGHT, {})
    var uniCallback = (x: number, y: number, value) => {
      var key = x + ',' + y
      if (value) {
        this.map[key] = WALL
        return
      }
      this.map[key] = FREE_CELL
      this.freeCells.push(key)
    }
    digger.create(uniCallback.bind(this))
  }

  drawMap() {
    for (var key in this.map) {
      var parts = key.split(",")
      var x = parseInt(parts[0])
      var y = parseInt(parts[1])
      this.display.draw(x, y, this.map[key], null, null)
    }
  }

  componentDidMount() {
    this.setupInit()
    document.getElementById("container")?.appendChild(this.display.getContainer()!)
    this.generateMap()
    this.drawMap()
    var playerPos = this.freeCells[Math.floor(Math.random() * this.freeCells.length)].split(',')
    this.player.place(parseInt(playerPos[0]), parseInt(playerPos[1]))
    this.update()
  }

  update() {
    this.display.clear()
    this.drawMap()
    this.display.draw(this.player.x, this.player.y, '@', '#FFF', '#000')   // TODO draw all entities
  }

  setupInit() {
    window.addEventListener("keydown", e => {
      if (e.key in MOVEMENT) {
        var newX = this.player.x + MOVEMENT[e.key].x
        var newY = this.player.y + MOVEMENT[e.key].y
        var newPos = newX + ',' + newY
        if (this.freeCells.find(pos => pos === newPos))
          this.player.move(MOVEMENT[e.key])
      }

      this.update()
    })
  }

  render() {
    return (<div style={{ width: "100vw" }}>
      <div style={{ width: "400px", marginRight: "auto", marginLeft: "auto" }}>
        <h1>Brother Mouse</h1>
        <div id="container"></div>
        <div>
          <h1>Controls</h1>
          <p>WASD (or Numpad) to move</p>
        </div>
      </div>

    </div>);
  }
}


export default App;
