import * as PIXI from "pixi.js"

export class ObjectPool {
  private pool: PIXI.Sprite[] = []

	constructor(private texture: PIXI.Texture) {}

  acquire(): PIXI.Sprite {
    return this.pool.pop() || new PIXI.Sprite(this.texture)
  }

  release(obj: PIXI.Sprite) {
    obj.removeFromParent()
    this.pool.push(obj)
  }
}