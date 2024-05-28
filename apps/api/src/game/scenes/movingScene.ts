import type { Game } from "../game"
import { GameScene } from "./gameScene"

interface IMovingSceneOptions {
  game: Game
}

export class MovingScene extends GameScene {
  constructor({ game }: IMovingSceneOptions) {
    super({
      game,
    })

    void this.init()
  }

  public async init() {
    const village = this.initStartingVillage()
    const wagonStartPoint = village.getWagonStopPoint()

    this.wagonService.initWagon(wagonStartPoint)
    await this.initGroupPlayers()

    void this.play()
  }

  initStartingVillage() {
    const initialOffsetX = 500
    const initialOffsetY = 2000
    const width = 3600
    const height = 2000
    const area = {
      width,
      height,
      center: {
        x: Math.round(width / 2 + initialOffsetX),
        y: Math.round(height / 2 + initialOffsetY),
      },
    }
    const village = this.wagonService.routeService.generateRandomVillage({
      center: area.center,
      width: area.width,
      height: area.height,
      theme: this.getRandomTheme(),
    })
    this.chunks.push(village)

    return village
  }

  async initGroupPlayers() {
    if (!this.group) {
      return
    }

    for (const player of this.group.players) {
      const instance = await this.initPlayer(player.id)
      this.objects.push(instance)
    }
  }
}
