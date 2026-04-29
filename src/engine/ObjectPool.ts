import * as PIXI from "pixi.js"

export class ObjectPool {
  private pool: PIXI.Graphics[] = []

  acquire(): PIXI.Graphics {
    return this.pool.pop() || new PIXI.Graphics()
  }

  release(obj: PIXI.Graphics) {
    obj.clear()
    obj.removeFromParent()
    this.pool.push(obj)
  }
}