import * as PIXI from "pixi.js"
import { Camera } from './engine/Camera'
import { World } from "./engine/World"
import { Renderer } from "./engine/Renderer"
import { CONFIG } from "./config"

const TARGET_HEIGHT: number = 900

const CAMERA_SPEED: number = TARGET_HEIGHT / 40
// let relativeCameraSpeed: number = 2

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: 0x0,
})
document.body.appendChild(app.view as HTMLCanvasElement)

const camera:Camera = new Camera()
const world:World = new World()
const renderer:Renderer = new Renderer(app, app.stage, camera, world)

const keys: Record<string, boolean> = {}
window.addEventListener("keydown", e => (keys[e.key] = true))
window.addEventListener("keyup", e => (keys[e.key] = false))

app.ticker.add((delta: number) => {
	const deltaTime: number = delta / 60

  if (keys["w"]) camera.move(0, -CAMERA_SPEED, deltaTime)
  if (keys["s"]) camera.move(0, CAMERA_SPEED, deltaTime)
  if (keys["a"]) camera.move(-CAMERA_SPEED, 0, deltaTime)
  if (keys["d"]) camera.move(CAMERA_SPEED, 0, deltaTime)

  renderer.update(app.screen.width, app.screen.height)
})