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

export const animateComponentEntrance = (idx, transition) => ({ dom }) => {
  dom.style.opacity = 0
  return setTimeout(() => {
    dom.classList.add(transition)
    dom.style.opacity = 1
  }, idx * 100 + 20)
}

export const animateComponentExit = (idx, transition) => ({ dom }) => {
  console.log(dom)
  dom.style.opacity = 1

  return new Promise(function(resolve) {
    setTimeout(() => {
      dom.classList.add(transition)
      dom.style.opacity = 0
    }, idx * 100 + 20)
    dom.addEventListener("animationend", resolve)
  })
}

const shapes = ["circle", "square", "triangle"]

const Model = {
  count: Stream(rand(30, 70)),
  preventUpdate: Stream(true),
  shapes,
  width: Stream(600),
  height: Stream(600),
  artworks: Stream([]),
  canvas: Stream(null),
  ctx: Stream(null),
  dom: Stream(null),
  rotateCanvas: Stream(0),
  saveArt,
  log,
  orientation: "portrait"
}
export default Model
