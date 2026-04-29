import { WorldObject } from "../types"

export class SpatialHash {
  private grid: Map<string, WorldObject[]> = new Map<string, WorldObject[]>()

  constructor(private cellSize: number) {}

  private key(x: number, y: number) {
    return `${x},${y}`
  }

  insert(obj: WorldObject) {
    const cx: number = Math.floor(obj.x / this.cellSize)
    const cy: number = Math.floor(obj.y / this.cellSize)
    const key: string = this.key(cx, cy)

		this.grid.set(key, [])
    this.grid.get(key)!.push(obj)
  }

  query(bounds: { x: number; y: number; width: number; height: number }) {
    const results: WorldObject[] = []

    const minX: number = Math.floor(bounds.x / this.cellSize)
    const minY: number = Math.floor(bounds.y / this.cellSize)
    const maxX: number = Math.floor((bounds.x + bounds.width) / this.cellSize)
    const maxY: number = Math.floor((bounds.y + bounds.height) / this.cellSize)

    for (let x: number = minX; x <= maxX; x++) {
      for (let y: number = minY; y <= maxY; y++) {
        const cell: WorldObject[] | undefined = this.grid.get(`${x},${y}`)
        if (cell) {
					results.push(...cell)
				}
      }
    }

    return results
  }
}