import * as PIXI from "pixi.js"
import { Camera } from "./Camera"
import { World } from "./World"
import { ObjectPool } from "./ObjectPool"
import { CONFIG } from "../config"
import { WorldObject } from "../types"

export class Renderer {
  private active: Map<number, PIXI.Graphics> = new Map<number, PIXI.Graphics>()
  private pool: ObjectPool = new ObjectPool()

  constructor(
    private stage: PIXI.Container,
    private camera: Camera,
    private world: World
  ) {}

  update(screenW: number, screenH: number) {
    const bounds = this.camera.getViewBounds(
      screenW,
      screenH,
      CONFIG.VIEW_PADDING
    );

    const visible: WorldObject[] = this.world.spatial.query(bounds)
    const visibleIds = new Set(visible.map(o => o.id))

    for (const [id, sprite] of this.active) {
      if (!visibleIds.has(id)) {
        this.pool.release(sprite)
        this.active.delete(id)
      }
    }

    for (const obj of visible) {
      if (this.active.has(obj.id)) continue

      const g: PIXI.Graphics = this.pool.acquire()
      g.beginFill(Math.floor(Math.random() * 0xffffff))
      g.drawRect(0, 0, CONFIG.OBJECT_SIZE, CONFIG.OBJECT_SIZE)
      g.endFill()

      this.stage.addChild(g)
      this.active.set(obj.id, g)
    }

    for (const [id, sprite] of this.active) {
      const obj: WorldObject | undefined = visible.find(o => o.id === id)
      if (!obj) continue

      sprite.x = obj.x - this.camera.x
      sprite.y = obj.y - this.camera.y
    }
  }
}