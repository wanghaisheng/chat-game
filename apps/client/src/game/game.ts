import { Container } from "pixi.js"
import type {
  IGameBuildingCampfire,
  IGameBuildingConstructionArea,
  IGameBuildingStore,
  IGameBuildingWagonStop,
  IGameBuildingWarehouse,
  IGameObject,
  IGameObjectArea,
  IGameObjectCourier,
  IGameObjectFarmer,
  IGameObjectFlag,
  IGameObjectLake,
  IGameObjectMechanic,
  IGameObjectPlayer,
  IGameObjectRabbit,
  IGameObjectRaider,
  IGameObjectStone,
  IGameObjectTrader,
  IGameObjectTree,
  IGameObjectWagon,
  IGameObjectWolf,
  WebSocketMessage,
} from "../../../../packages/api-sdk/src"
import {
  Area,
  Flag,
  type GameObjectContainer,
  Lake,
  Rabbit,
  Stone,
  Tree,
  Wolf,
} from "./objects"
import { Campfire } from "./objects/buildings/campfire"
import { ConstructionArea } from "./objects/buildings/constructionArea"
import { Store } from "./objects/buildings/store"
import { WagonStop } from "./objects/buildings/wagonStop"
import { Warehouse } from "./objects/buildings/warehouse"
import {
  Courier,
  Farmer,
  Mechanic,
  Player,
  Raider,
  Trader,
} from "./objects/units"
import { Wagon } from "./objects/wagon"
import {
  AssetsManager,
  AudioManager,
  SceneManager,
  WebSocketManager,
} from "./utils"
import { BackgroundGenerator } from "./utils/generators/background"

export class Game extends Container {
  public children: GameObjectContainer[] = []
  public audio: AudioManager
  public scene: SceneManager
  public bg: BackgroundGenerator

  public cameraOffsetX = 0
  public cameraMovementSpeedX = 0.008
  public cameraOffsetY = 0
  public cameraMovementSpeedY = 0.008
  public cameraX = 0
  public cameraY = 0
  public cameraPerfectX = 0
  public cameraPerfectY = 0

  constructor() {
    super()

    this.audio = new AudioManager()
    this.scene = new SceneManager()
    this.bg = new BackgroundGenerator(this.scene.app)
  }

  async play() {
    await AssetsManager.init()

    this.audio.playBackgroundSound()

    const bg = await this.bg.getGeneratedBackgroundTilingSprite()
    bg.x = -500
    bg.y = -500
    bg.width = 50000
    bg.height = 50000
    this.scene.app.stage.addChild(bg)

    this.scene.app.stage.addChild(this)

    this.scene.app.ticker.add(() => {
      this.animateObjects()
      this.removeDestroyedObjects()

      const wagon = this.children.find((child) => child instanceof Wagon)
      if (wagon) {
        this.moveCameraToWagon(wagon as Wagon)
      }
    })

    WebSocketManager.init(this)

    setInterval(() => {
      console.log("FPS", this.scene.app.ticker.FPS)
      console.log("Objects", this.children.length)
    }, 1000)
  }

  moveCameraToWagon(wagon: Wagon) {
    const columnWidth = this.scene.app.screen.width / 6
    const leftPadding =
      wagon.direction === "LEFT" ? columnWidth * 4 : columnWidth * 2

    const topPadding = this.scene.app.screen.height / 2

    this.cameraPerfectX = -wagon.x + this.cameraOffsetX + leftPadding
    this.cameraPerfectY = -wagon.y + this.cameraOffsetY + topPadding

    this.cameraX = this.cameraPerfectX
    this.cameraY = this.cameraPerfectY

    if (Math.abs(this.cameraOffsetX) >= 20) {
      this.cameraMovementSpeedX *= -1
    }
    this.cameraOffsetX += this.cameraMovementSpeedX

    if (Math.abs(this.cameraOffsetY) >= 30) {
      this.cameraMovementSpeedY *= -1
    }
    this.cameraOffsetY += this.cameraMovementSpeedY

    this.parent.x = this.cameraX
    this.parent.y = this.cameraY
  }

  rebuildScene() {
    this.children = []
  }

  findObject(id: string) {
    return this.children.find((obj) => obj.id === id)
  }

  initWagon(object: IGameObjectWagon) {
    const wagon = new Wagon({ game: this, object })
    this.addChild(wagon)
  }

  updateWagon(object: IGameObjectWagon) {
    const wagon = this.findObject(object.id)
    if (wagon instanceof Wagon) {
      wagon.update(object)
    }
  }

  initArea(object: IGameObjectArea) {
    const area = new Area({ game: this, object })
    this.addChild(area)
  }

  updateArea(object: IGameObjectArea) {
    const area = this.findObject(object.id)
    if (area instanceof Area) {
      area.update(object)
    }
  }

  initTree(object: IGameObjectTree) {
    const tree = new Tree({ game: this, object })
    this.addChild(tree)
  }

  updateTree(object: IGameObjectTree) {
    const tree = this.findObject(object.id)
    if (tree instanceof Tree) {
      tree.update(object)
    }
  }

  initStone(object: IGameObjectStone) {
    const stone = new Stone({ game: this, object })
    this.addChild(stone)
  }

  updateStone(object: IGameObjectStone) {
    const stone = this.findObject(object.id)
    if (stone instanceof Stone) {
      stone.update(object)
    }
  }

  initPlayer(object: IGameObjectPlayer) {
    const player = new Player({ game: this, object })
    this.addChild(player)
  }

  updatePlayer(object: IGameObjectPlayer) {
    const player = this.findObject(object.id)
    if (player instanceof Player) {
      player.update(object)
    }
  }

  initCourier(object: IGameObjectCourier) {
    const courier = new Courier({ game: this, object })
    this.addChild(courier)
  }

  updateCourier(object: IGameObjectCourier) {
    const courier = this.findObject(object.id)
    if (courier instanceof Courier) {
      courier.update(object)
    }
  }

  initFarmer(object: IGameObjectFarmer) {
    const farmer = new Farmer({ game: this, object })
    this.addChild(farmer)
  }

  updateFarmer(object: IGameObjectFarmer) {
    const farmer = this.findObject(object.id)
    if (farmer instanceof Farmer) {
      farmer.update(object)
    }
  }

  initTrader(object: IGameObjectTrader) {
    const unit = new Trader({ game: this, object })
    this.addChild(unit)
  }

  updateTrader(object: IGameObjectTrader) {
    const unit = this.findObject(object.id)
    if (unit instanceof Trader) {
      unit.update(object)
    }
  }

  initMechanic(object: IGameObjectMechanic) {
    const unit = new Mechanic({ game: this, object })
    this.addChild(unit)
  }

  updateMechanic(object: IGameObjectMechanic) {
    const unit = this.findObject(object.id)
    if (unit instanceof Mechanic) {
      unit.update(object)
    }
  }

  initRaider(object: IGameObjectRaider) {
    const raider = new Raider({ game: this, object })
    this.addChild(raider)
  }

  updateRaider(object: IGameObjectRaider) {
    const raider = this.findObject(object.id)
    if (raider instanceof Raider) {
      raider.update(object)
    }
  }

  initRabbit(object: IGameObjectRabbit) {
    const rabbit = new Rabbit({ game: this, object })
    this.addChild(rabbit)
  }

  updateRabbit(object: IGameObjectRabbit) {
    const rabbit = this.findObject(object.id)
    if (rabbit instanceof Rabbit) {
      rabbit.update(object)
    }
  }

  initWolf(object: IGameObjectWolf) {
    const wolf = new Wolf({ game: this, object })
    this.addChild(wolf)
  }

  updateWolf(object: IGameObjectWolf) {
    const wolf = this.findObject(object.id)
    if (wolf instanceof Wolf) {
      wolf.update(object)
    }
  }

  initLake(object: IGameObjectLake) {
    const lake = new Lake({ game: this, object })
    this.addChild(lake)
  }

  updateLake(object: IGameObjectLake) {
    const lake = this.findObject(object.id)
    if (lake instanceof Lake) {
      lake.update(object)
    }
  }

  initCampfire(object: IGameBuildingCampfire) {
    const building = new Campfire({ game: this, object })
    this.addChild(building)
  }

  updateCampfire(object: IGameBuildingCampfire) {
    const building = this.findObject(object.id)
    if (building instanceof Campfire) {
      building.update(object)
    }
  }

  initWarehouse(object: IGameBuildingWarehouse) {
    const building = new Warehouse({ game: this, object })
    this.addChild(building)
  }

  updateWarehouse(object: IGameBuildingWarehouse) {
    const building = this.findObject(object.id)
    if (building instanceof Warehouse) {
      building.update(object)
    }
  }

  initWagonStop(object: IGameBuildingWagonStop) {
    const building = new WagonStop({ game: this, object })
    this.addChild(building)
  }

  updateWagonStop(object: IGameBuildingWagonStop) {
    const building = this.findObject(object.id)
    if (building instanceof WagonStop) {
      building.update(object)
    }
  }

  initStore(object: IGameBuildingStore) {
    const building = new Store({ game: this, object })
    this.addChild(building)
  }

  updateStore(object: IGameBuildingStore) {
    const building = this.findObject(object.id)
    if (building instanceof Store) {
      building.update(object)
    }
  }

  initConstructionArea(object: IGameBuildingConstructionArea) {
    const building = new ConstructionArea({ game: this, object })
    this.addChild(building)
  }

  updateConstructionArea(object: IGameBuildingConstructionArea) {
    const building = this.findObject(object.id)
    if (building instanceof ConstructionArea) {
      building.update(object)
    }
  }

  initFlag(object: IGameObjectFlag) {
    const flag = new Flag({ game: this, object })
    this.addChild(flag)
  }

  updateFlag(object: IGameObjectFlag) {
    const flag = this.findObject(object.id)
    if (flag instanceof Flag) {
      flag.update(object)
    }
  }

  checkIfThisFlagIsTarget(id: string) {
    for (const obj of this.children) {
      if (obj.target?.id === id) {
        return true
      }
    }
  }

  animateObjects() {
    for (const object of this.children) {
      object.animate()
    }
  }

  removeDestroyedObjects() {
    for (const object of this.children) {
      if (object.state === "DESTROYED") {
        const index = this.children.indexOf(object)
        this.children.splice(index, 1)
        return
      }
    }
  }

  handleMessage(message: WebSocketMessage) {
    if (message.object) {
      this.handleMessageObject(message.object)
    }
    if (message.event) {
      this.handleMessageEvent(message.event)
    }
  }

  handleMessageObject(object: Partial<IGameObject>) {
    if (!object.id) {
      return
    }

    const obj = this.findObject(object.id)
    if (!obj) {
      if (object.entity === "WAGON") {
        this.initWagon(object as IGameObjectWagon)
        return
      }
      if (object.entity === "AREA") {
        this.initArea(object as IGameObjectArea)
        return
      }
      if (object.entity === "TREE") {
        this.initTree(object as IGameObjectTree)
        return
      }
      if (object.entity === "STONE") {
        this.initStone(object as IGameObjectStone)
        return
      }
      if (object.entity === "PLAYER") {
        this.initPlayer(object as IGameObjectPlayer)
        return
      }
      if (object.entity === "COURIER") {
        this.initCourier(object as IGameObjectCourier)
        return
      }
      if (object.entity === "FARMER") {
        this.initFarmer(object as IGameObjectFarmer)
        return
      }
      if (object.entity === "TRADER") {
        this.initTrader(object as IGameObjectTrader)
        return
      }
      if (object.entity === "MECHANIC") {
        this.initMechanic(object as IGameObjectMechanic)
        return
      }
      if (object.entity === "RAIDER") {
        this.initRaider(object as IGameObjectRaider)
        return
      }
      if (object.entity === "RABBIT") {
        this.initRabbit(object as IGameObjectRabbit)
        return
      }
      if (object.entity === "WOLF") {
        this.initWolf(object as IGameObjectWolf)
        return
      }
      if (object.entity === "LAKE") {
        this.initLake(object as IGameObjectLake)
        return
      }
      if (object.entity === "CAMPFIRE") {
        this.initCampfire(object as IGameBuildingCampfire)
        return
      }
      if (object.entity === "WAREHOUSE") {
        this.initWarehouse(object as IGameBuildingWarehouse)
        return
      }
      if (object.entity === "WAGON_STOP") {
        this.initWagonStop(object as IGameBuildingWagonStop)
        return
      }
      if (object.entity === "STORE") {
        this.initStore(object as IGameBuildingStore)
        return
      }
      if (object.entity === "CONSTRUCTION_AREA") {
        this.initConstructionArea(object as IGameBuildingConstructionArea)
        return
      }
      if (object.entity === "FLAG") {
        this.initFlag(object as IGameObjectFlag)
        return
      }
      return
    }

    if (object.entity === "WAGON") {
      this.updateWagon(object as IGameObjectWagon)
      return
    }
    if (object.entity === "AREA") {
      this.updateArea(object as IGameObjectArea)
      return
    }
    if (object.entity === "TREE") {
      this.updateTree(object as IGameObjectTree)
      return
    }
    if (object.entity === "STONE") {
      this.updateStone(object as IGameObjectStone)
      return
    }
    if (object.entity === "PLAYER") {
      this.updatePlayer(object as IGameObjectPlayer)
      return
    }
    if (object.entity === "COURIER") {
      this.updateCourier(object as IGameObjectCourier)
      return
    }
    if (object.entity === "FARMER") {
      this.updateFarmer(object as IGameObjectFarmer)
      return
    }
    if (object.entity === "TRADER") {
      this.updateTrader(object as IGameObjectTrader)
      return
    }
    if (object.entity === "MECHANIC") {
      this.updateMechanic(object as IGameObjectMechanic)
      return
    }
    if (object.entity === "RAIDER") {
      this.updateRaider(object as IGameObjectRaider)
      return
    }
    if (object.entity === "RABBIT") {
      this.updateRabbit(object as IGameObjectRabbit)
      return
    }
    if (object.entity === "WOLF") {
      this.updateWolf(object as IGameObjectWolf)
      return
    }
    if (object.entity === "LAKE") {
      this.updateLake(object as IGameObjectLake)
      return
    }
    if (object.entity === "CAMPFIRE") {
      this.updateCampfire(object as IGameBuildingCampfire)
      return
    }
    if (object.entity === "WAREHOUSE") {
      this.updateWarehouse(object as IGameBuildingWarehouse)
      return
    }
    if (object.entity === "WAGON_STOP") {
      this.updateWagonStop(object as IGameBuildingWagonStop)
      return
    }
    if (object.entity === "STORE") {
      this.updateStore(object as IGameBuildingStore)
      return
    }
    if (object.entity === "CONSTRUCTION_AREA") {
      this.updateConstructionArea(object as IGameBuildingConstructionArea)
      return
    }
    if (object.entity === "FLAG") {
      this.updateFlag(object as IGameObjectFlag)
      return
    }
  }

  handleMessageEvent(event: WebSocketMessage["event"]) {
    if (event === "RAID_STARTED") {
      this.audio.playRaidSound()
    }
    if (event === "GROUP_FORM_STARTED") {
      this.audio.playRaidSound()
    }
    if (event === "ADVENTURE_QUEST_STARTED") {
      this.audio.playRaidSound()
    }
    if (event === "SCENE_CHANGED") {
      this.rebuildScene()
    }
  }
}
