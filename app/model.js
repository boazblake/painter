import Stream from "mithril-stream"

const WIDTH = Stream(600)
const HEIGHT = Stream(600)

const getDpr = (size) => size * window.devicePixelRatio || 1

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)
export const last = (xs) => xs[xs.length - 1]
export const rest = ([head, ...rest]) => rest

export const getPosition = (mdl) => ({
  x: rand(0, mdl.width()),
  y: rand(0, mdl.height())
})
export const getRotation = () => rand(0, 360)
export const getWidth = (mdl) => rand(0, mdl.width())
export const getHeight = (mdl) => rand(0, mdl.height())
export const getHue = () => rand(0, 999)
export const range = (size) => [...Array(size).keys()]

export const isEmpty = (xs) => xs.length == 0

const saveArt = (mdl, art) => {
  let image = { id: mdl.artworks().length, art }
  mdl.artworks.map((xs) => xs.push(image))
}

const shapes = ["circle", "square", "triangle"]

const Model = {
  count: Stream(rand(30, 70)),
  preventUpdate: Stream(true),
  shapes,
  width: () => WIDTH.map(getDpr)(),
  height: () => HEIGHT.map(getDpr)(),
  artworks: Stream([]),
  canvas: Stream(null),
  ctx: Stream(null),
  dom: Stream(null),
  saveArt,
  log,
  orientation: "portrait"
}
export default Model
