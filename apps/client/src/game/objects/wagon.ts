import { Sprite } from "pixi.js";
import type { IGameObjectWagon } from "../../../../../packages/api-sdk/src";
import type { GraphicsContainer } from "../components/graphicsContainer";
import { WagonEngineContainer } from "../components/wagonEngineContainer.ts";
import { WagonWheelContainer } from "../components/wagonWheelContainer";
import type { Game } from "../game";
import { GameObjectContainer } from "./gameObjectContainer";

interface IWagonOptions {
  game: Game;
  object: IGameObjectWagon;
}

export class Wagon extends GameObjectContainer implements IGameObjectWagon {
  public speed!: number;
  public area!: IGameObjectWagon["area"];
  public isVisibleOnClient!: IGameObjectWagon["isVisibleOnClient"];

  public children: GraphicsContainer[] = [];

  constructor({ game, object }: IWagonOptions) {
    super({ game, ...object });

    this.update(object);
    this.init();
  }

  init() {
    const spriteSide = Sprite.from("wagonBase1");
    spriteSide.anchor.set(0.5, 1);
    spriteSide.scale = 0.75;

    const spriteBase = Sprite.from("wagonBase2");
    spriteBase.anchor.set(0.5, 1);
    spriteBase.scale = 0.75;

    const engine = WagonEngineContainer.create("wagonEngine1", "RIGHT");
    engine.scale = 0.75;

    const wheel1 = WagonWheelContainer.create("wagonWheel1", "RIGHT", "LEFT");
    const wheel2 = WagonWheelContainer.create("wagonWheel1", "RIGHT", "RIGHT");
    wheel1.scale = 0.75;
    wheel2.scale = 0.75;

    this.addChild(spriteBase, engine, spriteSide, wheel1, wheel2);
  }

  animate() {
    for (const container of this.children) {
      container.visible = true;

      this.drawWheels(container);
      this.drawEngine(container);
    }

    this.handleSoundByState();
  }

  drawWheels(container: GraphicsContainer) {
    if (container instanceof WagonWheelContainer) {
      if (container.side === "LEFT") {
        container.x = -123;
        container.y = -16;
      }
      if (container.side === "RIGHT") {
        container.x = 123;
        container.y = -16;
      }

      container.visible = true;

      const wheelRotation = this.direction === "LEFT" ? -1 : 1;

      container.angle += (wheelRotation * this.speed) / 3;
    }
  }

  drawEngine(container: GraphicsContainer) {
    if (container instanceof WagonEngineContainer) {
      container.x = -102;
      container.y = -58;

      container.visible = true;
    }
  }

  handleSoundByState() {
    if (this.state === "MOVING") {
      this.game.audio.playWagonMovingSound();
    }
  }

  update(object: IGameObjectWagon) {
    this.x = object.x;
    this.y = object.y;
    this.zIndex = Math.round(object.y);

    this.entity = object.entity;
    this.state = object.state;
    this.direction = object.direction;
    this.health = object.health;

    this.speed = object.speed;
  }
}