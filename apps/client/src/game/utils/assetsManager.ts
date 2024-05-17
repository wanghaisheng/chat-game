import {
  AnimatedSprite,
  type Application,
  Assets,
  Graphics,
  Sprite,
  Texture,
  TilingSprite,
} from "pixi.js"
import {
  type IGameObjectUnit,
  getRandomInRange,
} from "../../../../../packages/api-sdk/src"
import campfireAnimation1 from "../assets/images/animation/campfire/1.png"
import campfireAnimation2 from "../assets/images/animation/campfire/2.png"
import campfireAnimation3 from "../assets/images/animation/campfire/3.png"
import campfireAnimation4 from "../assets/images/animation/campfire/4.png"
import campfireAnimation5 from "../assets/images/animation/campfire/5.png"
import fireParticle1 from "../assets/images/animation/campfire/particle-1.png"
import fireParticle2 from "../assets/images/animation/campfire/particle-2.png"
import fireParticle3 from "../assets/images/animation/campfire/particle-3.png"
import heroRight1 from "../assets/images/animation/hero-moving-right/1.png"
import heroRight2 from "../assets/images/animation/hero-moving-right/2.png"
import heroRight3 from "../assets/images/animation/hero-moving-right/3.png"
import heroRight4 from "../assets/images/animation/hero-moving-right/4.png"
import heroRight5 from "../assets/images/animation/hero-moving-right/5.png"
import heroRight6 from "../assets/images/animation/hero-moving-right/6.png"
import campfire1 from "../assets/images/buildings/camp-fire-1.png"
import constructionArea1 from "../assets/images/buildings/construction-1.png"
import store1 from "../assets/images/buildings/store.png"
import wagonStop1 from "../assets/images/buildings/wagon-stop-1.png"
import warehouse1 from "../assets/images/buildings/warehouse-1.png"
import coin1 from "../assets/images/icons/coin-1.png"
import flag1 from "../assets/images/objects/flag-1.png"
import flag2 from "../assets/images/objects/flag-2.png"
import stone1 from "../assets/images/objects/stone-1.png"
import tree1Blue from "../assets/images/objects/tree/1/blue.png"
import tree1Green from "../assets/images/objects/tree/1/green.png"
import tree1Stone from "../assets/images/objects/tree/1/stone.png"
import tree1Teal from "../assets/images/objects/tree/1/teal.png"
import tree1Toxic from "../assets/images/objects/tree/1/toxic.png"
import tree1Violet from "../assets/images/objects/tree/1/violet.png"
import tree2Blue from "../assets/images/objects/tree/2/blue.png"
import tree2Green from "../assets/images/objects/tree/2/green.png"
import tree2Stone from "../assets/images/objects/tree/2/stone.png"
import tree2Teal from "../assets/images/objects/tree/2/teal.png"
import tree2Toxic from "../assets/images/objects/tree/2/toxic.png"
import tree2Violet from "../assets/images/objects/tree/2/violet.png"
import tree3Blue from "../assets/images/objects/tree/3/blue.png"
import tree3Green from "../assets/images/objects/tree/3/green.png"
import tree3Stone from "../assets/images/objects/tree/3/stone.png"
import tree3Teal from "../assets/images/objects/tree/3/teal.png"
import tree3Toxic from "../assets/images/objects/tree/3/toxic.png"
import tree3Violet from "../assets/images/objects/tree/3/violet.png"
import tree4Blue from "../assets/images/objects/tree/4/blue.png"
import tree4Green from "../assets/images/objects/tree/4/green.png"
import tree4Stone from "../assets/images/objects/tree/4/stone.png"
import tree4Teal from "../assets/images/objects/tree/4/teal.png"
import tree4Toxic from "../assets/images/objects/tree/4/toxic.png"
import tree4Violet from "../assets/images/objects/tree/4/violet.png"
import tree5Blue from "../assets/images/objects/tree/5/blue.png"
import tree5Green from "../assets/images/objects/tree/5/green.png"
import tree5Stone from "../assets/images/objects/tree/5/stone.png"
import tree5Teal from "../assets/images/objects/tree/5/teal.png"
import tree5Toxic from "../assets/images/objects/tree/5/toxic.png"
import tree5Violet from "../assets/images/objects/tree/5/violet.png"
import unitHairClassicRight from "../assets/images/unit/hairstyle/hair-classic-right.png"
import unitHairCoalLongRight from "../assets/images/unit/hairstyle/hair-coal-long-right.png"
import unitHairOrangeWithBeard from "../assets/images/unit/hairstyle/orange-with-beard.png"
import unitHead1Right from "../assets/images/unit/head/head-1-right.png"
import blackTopRight from "../assets/images/unit/top/black-top-right.png"
import blueTopRight from "../assets/images/unit/top/blue-top-right.png"
import darkSilverTopRight from "../assets/images/unit/top/dark-silver-top-right.png"
import greenTopRight from "../assets/images/unit/top/green-top-right.png"
import violetTopRight from "../assets/images/unit/top/violet-top-right.png"
import chest1 from "../assets/images/wagon/chest-1.png"
import wagonEngineCloud1 from "../assets/images/wagon/clouds/1.png"
import wagonEngineCloud2 from "../assets/images/wagon/clouds/2.png"
import wagonEngineCloud3 from "../assets/images/wagon/clouds/3.png"
import wagonEngineCloud4 from "../assets/images/wagon/clouds/4.png"
import wagonEngine1 from "../assets/images/wagon/engine-1.png"
import wagonBase1 from "../assets/images/wagon/wagon-1.png"
import wagonBase2 from "../assets/images/wagon/wagon-2.png"
import wagonWheel1 from "../assets/images/wagon/wheel-1.png"
import water1 from "../assets/images/water/1.png"
import water2 from "../assets/images/water/2.png"
import water3 from "../assets/images/water/3.png"
import water4 from "../assets/images/water/4.png"

export abstract class AssetsManager {
  static assets = [
    { alias: "water1", src: water1 },
    { alias: "water2", src: water2 },
    { alias: "water3", src: water3 },
    { alias: "water4", src: water4 },
    { alias: "player1", src: "/hero/hero_64.png" },
    { alias: "playerLeft", src: "/hero/hero_empty_left_64.png" },
    { alias: "playerTopLeft", src: "/hero/top2_left_64.png" },
    { alias: "playerRight", src: "/hero/hero_empty_right_64.png" },
    { alias: "playerTopRight", src: "/hero/top2_right_64.png" },
    { alias: "stone1", src: stone1 },
    { alias: "rabbitLeft", src: "/creatures/rabbit1_left_64.png" },
    { alias: "rabbitRight", src: "/creatures/rabbit1_right_64.png" },
    { alias: "wolfLeft", src: "/creatures/wolf1_left_64.png" },
    { alias: "wolfRight", src: "/creatures/wolf1_right_64.png" },
    { alias: "wood1", src: "/wood/wood1_64.png" },
    { alias: "stoneRes1", src: "/stone/stone_res1_64.png" },
    { alias: "toolAxe1", src: "/tools/axe1_64.png" },
    { alias: "toolPickaxe1", src: "/tools/pickaxe1_64.png" },
    { alias: "campfire1", src: campfire1 },
    { alias: "campfireAnimation1", src: campfireAnimation1 },
    { alias: "campfireAnimation2", src: campfireAnimation2 },
    { alias: "campfireAnimation3", src: campfireAnimation3 },
    { alias: "campfireAnimation4", src: campfireAnimation4 },
    { alias: "campfireAnimation5", src: campfireAnimation5 },
    { alias: "fireParticle1", src: fireParticle1 },
    { alias: "fireParticle2", src: fireParticle2 },
    { alias: "fireParticle3", src: fireParticle3 },
    { alias: "warehouse1", src: warehouse1 },
    { alias: "wagonStop1", src: wagonStop1 },
    { alias: "store1", src: store1 },
    { alias: "constructionArea1", src: constructionArea1 },
    { alias: "flag1", src: flag1 },
    { alias: "flag2", src: flag2 },
    { alias: "wagonWheel1", src: wagonWheel1 },
    { alias: "wagonBase1", src: wagonBase1 },
    { alias: "wagonBase2", src: wagonBase2 },
    { alias: "wagonEngine1", src: wagonEngine1 },
    { alias: "wagonEngineCloud1", src: wagonEngineCloud1 },
    { alias: "wagonEngineCloud2", src: wagonEngineCloud2 },
    { alias: "wagonEngineCloud3", src: wagonEngineCloud3 },
    { alias: "wagonEngineCloud4", src: wagonEngineCloud4 },
    { alias: "chest1", src: chest1 },
    { alias: "coin1", src: coin1 },
  ]

  static animationAssets = [
    { alias: "heroRight1", src: heroRight1 },
    { alias: "heroRight2", src: heroRight2 },
    { alias: "heroRight3", src: heroRight3 },
    { alias: "heroRight4", src: heroRight4 },
    { alias: "heroRight5", src: heroRight5 },
    { alias: "heroRight6", src: heroRight6 },
  ]

  static headAssets = [{ alias: "unitHead1", src: unitHead1Right }]

  static hairAssets = [
    { alias: "unitHairClassic", src: unitHairClassicRight },
    { alias: "unitHairCoalLong", src: unitHairCoalLongRight },
    { alias: "unitHairOrangeWithBeard", src: unitHairOrangeWithBeard },
  ]

  static topAssets = [
    { alias: "violetTop", src: violetTopRight },
    { alias: "blackTop", src: blackTopRight },
    { alias: "greenTop", src: greenTopRight },
    { alias: "blueTop", src: blueTopRight },
    { alias: "darkSilverTop", src: darkSilverTopRight },
  ]

  static treeAssets = [
    { alias: "tree1Green", src: tree1Green },
    { alias: "tree1Blue", src: tree1Blue },
    { alias: "tree1Stone", src: tree1Stone },
    {
      alias: "tree1Teal",
      src: tree1Teal,
    },
    {
      alias: "tree1Toxic",
      src: tree1Toxic,
    },
    {
      alias: "tree1Violet",
      src: tree1Violet,
    },
    { alias: "tree2Green", src: tree2Green },
    { alias: "tree2Blue", src: tree2Blue },
    { alias: "tree2Stone", src: tree2Stone },
    {
      alias: "tree2Teal",
      src: tree2Teal,
    },
    {
      alias: "tree2Toxic",
      src: tree2Toxic,
    },
    {
      alias: "tree2Violet",
      src: tree2Violet,
    },
    { alias: "tree3Green", src: tree3Green },
    { alias: "tree3Blue", src: tree3Blue },
    { alias: "tree3Stone", src: tree3Stone },
    {
      alias: "tree3Teal",
      src: tree3Teal,
    },
    {
      alias: "tree3Toxic",
      src: tree3Toxic,
    },
    {
      alias: "tree3Violet",
      src: tree3Violet,
    },
    { alias: "tree4Green", src: tree4Green },
    { alias: "tree4Blue", src: tree4Blue },
    { alias: "tree4Stone", src: tree4Stone },
    {
      alias: "tree4Teal",
      src: tree4Teal,
    },
    {
      alias: "tree4Toxic",
      src: tree4Toxic,
    },
    {
      alias: "tree4Violet",
      src: tree4Violet,
    },
    { alias: "tree5Green", src: tree5Green },
    { alias: "tree5Blue", src: tree5Blue },
    { alias: "tree5Stone", src: tree5Stone },
    {
      alias: "tree5Teal",
      src: tree5Teal,
    },
    {
      alias: "tree5Toxic",
      src: tree5Toxic,
    },
    {
      alias: "tree5Violet",
      src: tree5Violet,
    },
  ]

  public static async init() {
    await Assets.load(AssetsManager.assets)
    await Assets.load(AssetsManager.animationAssets)
    await Assets.load(AssetsManager.headAssets)
    await Assets.load(AssetsManager.hairAssets)
    await Assets.load(AssetsManager.topAssets)
    await Assets.load(AssetsManager.treeAssets)
  }

  public static getAnimatedSpriteHero(direction: IGameObjectUnit["direction"]) {
    const images = [
      "heroRight1",
      "heroRight2",
      "heroRight3",
      "heroRight4",
      "heroRight5",
      "heroRight6",
    ]
    const textureArray = []

    for (const image of images) {
      const texture = Texture.from(image)
      textureArray.push(texture)
    }

    const animation = new AnimatedSprite(textureArray)
    animation.anchor.set(0.5, 1)

    if (direction === "LEFT") {
      // Flip horizontally
      animation.scale.x = -1
    }

    return animation
  }

  public static getAnimatedSpriteCampfire() {
    const images = [
      "campfireAnimation1",
      "campfireAnimation2",
      "campfireAnimation3",
      "campfireAnimation4",
      "campfireAnimation5",
    ]
    const textureArray = []

    for (const image of images) {
      const texture = Texture.from(image)
      textureArray.push(texture)
    }

    const animation = new AnimatedSprite(textureArray)
    animation.anchor.set(0.5, 1)

    return animation
  }

  public static getRandomSpriteForBackground(app: Application) {
    const graphics1 = new Graphics()
    graphics1.rect(0, 0, 64, 64).fill(0x0b8a8f)
    const texture1 = app.renderer.generateTexture(graphics1)

    const sprite1 = Sprite.from(texture1)
    const sprite2 = Sprite.from("backgroundTeal2")
    const sprite3 = Sprite.from("backgroundTeal3")
    const sprite4 = Sprite.from("backgroundTeal4")
    const sprite5 = Sprite.from("backgroundTeal5")

    const random = getRandomInRange(1, 100)
    if (random <= 55) {
      return sprite1
    }
    if (random <= 93) {
      return sprite2
    }
    if (random <= 96) {
      return sprite5
    }
    if (random <= 98) {
      return sprite3
    }
    return sprite4
  }

  public static getRandomSpriteForWater() {
    const sprite1 = Sprite.from("water1")
    const sprite2 = Sprite.from("water2")
    const sprite3 = Sprite.from("water3")
    const sprite4 = Sprite.from("water4")

    const random = getRandomInRange(1, 100)
    if (random <= 70) {
      return sprite2
    }
    if (random <= 80) {
      return sprite4
    }
    if (random <= 98) {
      return sprite1
    }
    return sprite3
  }

  public static generateRandomGridBackground({
    app,
    width,
    height,
  }: {
    app: Application
    width: number
    height: number
  }) {
    const gridX = Math.ceil(width / 64)
    const gridY = Math.floor(height / 64)

    const bg: Sprite[] = []

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        const background = AssetsManager.getRandomSpriteForBackground(app)

        background.x = i * 64
        background.y = j * 64

        bg.push(background)
      }
    }

    return bg
  }

  public static async generateAndSaveBackground(app: Application) {
    const bg = AssetsManager.generateRandomGridBackground({
      width: 2560,
      height: 1440,
      app,
    })
    app.stage.addChild(...bg)

    return AssetsManager.saveCanvasAsWebp(app)
  }

  public static async getGeneratedBackgroundTilingSprite(app: Application) {
    const bg = AssetsManager.generateRandomGridBackground({
      width: 2560,
      height: 1440,
      app,
    })
    app.stage.addChild(...bg)

    const blob = await app.renderer.extract.image({
      target: app.stage,
      format: "webp",
      quality: 1,
    })

    app.stage.removeChild(...bg)

    return new TilingSprite({
      texture: Texture.from(blob),
    })
  }

  public static async saveCanvasAsWebp(
    app: Application,
    imageName = "untitled",
  ) {
    const blob = await app.renderer.extract.image({
      target: app.stage,
      format: "webp",
      quality: 1,
    })

    const link = document.createElement("a")
    link.href = blob.src
    link.download = `${imageName}.webp`
    link.click()
    link.remove()
    app.renderer.destroy()
  }
}
