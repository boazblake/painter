import {
  range,
  getPosition,
  getRotation,
  getWidth,
  getHeight,
  getHue
} from "./model"

// hsla(hue, saturation, lightness, alpha)
// hue	0-360
// saturation	0-100%
// lightness	0-50-100%
// alpha	0.0-1.0
const hsla = (h, s, l, a) => `hsla(${h}, ${s}, ${l}, ${a})`

const drawSquare = (ctx, position, rotation, width, height, hue) => {
  // console.log("square", position, rotation, width, height)
  const color = hsla(hue, "60%", "50%", 0.75)
  ctx.save()
  ctx.fillStyle = color
  ctx.translate(position.x, position.y)
  ctx.rotate(rotation)
  ctx.fillRect(-width / 2, -height / 2, width, height)
  ctx.restore()
}

const drawTriangle = (ctx, position, rotation, width, height, hue) => {
  // console.log("triangle", position, rotation, width, height)
  const color = hsla(hue, "60%", "50%", 0.75)

  ctx.save()
  ctx.fillStyle = color
  ctx.translate(position.x, position.y)
  ctx.rotate(rotation)

  ctx.beginPath()
  ctx.moveTo(width, 0)
  ctx.lineTo(0, -width / 4)
  ctx.lineTo(0, width / 4)
  ctx.closePath()

  ctx.fill()
  ctx.restore()
}

const createArt = (ctx, mdl) => (shape) => {
  if (shape == "triangle")
    return drawTriangle(
      ctx,
      getPosition(mdl),
      getRotation(),
      getWidth(mdl),
      getHeight(mdl),
      getHue()
    )
  if (shape == "square")
    return drawSquare(
      ctx,
      getPosition(mdl),
      getRotation(),
      getWidth(mdl),
      getHeight(mdl),
      getHue()
    )
}

const getShape = (mdl) =>
  mdl.shapes[Math.floor(Math.random() * mdl.shapes.length)]

const Paint = ({ ctx, mdl }) =>
  range(mdl.count())
    .map((_) => getShape(mdl))
    .map(createArt(ctx, mdl))

export default Paint
