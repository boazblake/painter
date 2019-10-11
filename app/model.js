import Stream from "mithril-stream"

const shapes = ["circle", "square", "triangle"]
const last = (xs) => xs[xs.length - 1]

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

export const getPosition = (mdl) => ({
  x: rand(0, mdl.width),
  y: rand(0, mdl.height)
})

export const getRotation = () => rand(0, 360)
export const getWidth = (mdl) => rand(0, mdl.width)
export const getHeight = (mdl) => rand(0, mdl.height)
export const getHue = () => rand(0, 999)

export const range = (size) => [...Array(size).keys()]

const saveArt = (mdl, art) =>
  mdl.artworks.push({ id: mdl.artworks.length, art })

const Model = {
  count: Stream(rand(30, 70)),
  shapes,
  width: 600,
  height: 600,
  artworks: [],
  canvas: null,
  saveArt
}
export default Model
