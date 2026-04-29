import { SpatialHash } from "./SpatialHash"
import { CONFIG } from "../config"
import { WorldObject } from "../types"

export class World {
  spatial: SpatialHash

  constructor() {
    this.spatial = new SpatialHash(CONFIG.CELL_SIZE)
    this.generate()
  }

  private generate() {
    for (let i: number = 0; i < CONFIG.OBJECT_COUNT; i++) {
      const obj: WorldObject = {
        id: i,
        x: Math.random() * CONFIG.WORLD_SIZE,
        y: Math.random() * CONFIG.WORLD_SIZE,
      }

      this.spatial.insert(obj)
    }
  }
}