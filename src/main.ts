import * as PIXI from "pixi.js"
import { Camera } from './engine/Camera'
import { World } from "./engine/World"
import { Renderer } from "./engine/Renderer"

const TARGET_HEIGHT: number = 900

const CAMERA_SPEED: number = TARGET_HEIGHT / 400
// let relativeCameraSpeed: number = 2

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x0,
})
document.body.appendChild(app.view as HTMLCanvasElement)

const camera:Camera = new Camera()
const world:World = new World()
const renderer:Renderer = new Renderer(app.stage, camera, world)

const keys: Record<string, boolean> = {}
window.addEventListener("keydown", e => (keys[e.key] = true))
window.addEventListener("keyup", e => (keys[e.key] = false))

app.ticker.add(() => {
  if (keys["w"]) camera.move(0, -CAMERA_SPEED)
  if (keys["s"]) camera.move(0, CAMERA_SPEED)
  if (keys["a"]) camera.move(-CAMERA_SPEED, 0)
  if (keys["d"]) camera.move(CAMERA_SPEED, 0)

  renderer.update(app.screen.width, app.screen.height)
})