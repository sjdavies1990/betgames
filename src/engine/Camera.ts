export class Camera {
  x: number = 0
  y: number = 0
  speed: number = 10

  move(dx: number, dy: number) {
    this.x += dx * this.speed
    this.y += dy * this.speed
  }

  getViewBounds(width: number, height: number, padding: number) {
    return {
      x: this.x - padding,
      y: this.y - padding,
      width: width + padding * 2,
      height: height + padding * 2,
    }
  }
}