export class Camera {
  x: number = 0
  y: number = 0
  speed: number = 10

	/**
	 * Move the Camera
	 * @param dx x movement
	 * @param dy y movement
	 * @param dt delta time
	 */
  move(dx: number, dy: number, dt: number) {
    this.x += dx * this.speed * dt
    this.y += dy * this.speed * dt
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