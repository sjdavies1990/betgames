import * as PIXI from "pixi.js"
import { Camera } from "./Camera"
import { World } from "./World"
import { CONFIG } from "../config"
import { WorldObject } from "../types"
import { ObjectPool } from "./ObjectPool"

export class Renderer {
  private active: Map<number, PIXI.Sprite> = new Map<number, PIXI.Sprite>()
  private pool: ObjectPool

	private container: PIXI.ParticleContainer = new PIXI.ParticleContainer(10000, {
		position: true,
	})

	private texture: PIXI.Texture

  constructor(
		private app: PIXI.Application,
    private stage: PIXI.Container<PIXI.DisplayObject>,
    private camera: Camera,
    private world: World
  ) {
		this.texture = this.createTexture()
		this.stage.addChild(this.container as unknown as PIXI.DisplayObject)
		this.pool = new ObjectPool(this.texture)
	}

	private createTexture(): PIXI.Texture {
		const randHeightAndWidth: number = (Math.random() * (CONFIG.OBJECT_SIZE_LARGE - CONFIG.OBJECT_SIZE_SMALL)) + CONFIG.OBJECT_SIZE_SMALL

		const g: PIXI.Graphics = new PIXI.Graphics()
		g.beginFill(Math.floor(Math.random() * 0xffffff))
		g.drawRect(0, 0, randHeightAndWidth, randHeightAndWidth)
		g.endFill()
	
		return this.app.renderer.generateTexture(g)
	}

  update(screenW: number, screenH: number) {
    const bounds = this.camera.getViewBounds(
      screenW,
      screenH,
      CONFIG.VIEW_PADDING
    );

    const visible: WorldObject[] = this.world.spatial.query(bounds)
    const visibleIds = new Set(visible.map(o => o.id))

		const visibleMap: Map<number, WorldObject> = new Map(visible.map(o => [o.id, o]))

    for (const [id, sprite] of this.active) {
      if (!visibleIds.has(id)) {
        this.pool.release(sprite)
        this.active.delete(id)
      }
    }

    for (const obj of visible) {
      if (this.active.has(obj.id)) continue

      const sprite: PIXI.Sprite = this.pool.acquire()
			
      this.container.addChild(sprite)
      this.active.set(obj.id, sprite)
    }

    for (const [id, sprite] of this.active) {
      const obj: WorldObject | undefined = visibleMap.get(id)
      if (!obj) continue

      sprite.x = obj.x - this.camera.x
      sprite.y = obj.y - this.camera.y
    }
  }
}