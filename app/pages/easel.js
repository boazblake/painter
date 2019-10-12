import m from "mithril"
import Canvas from "./canvas.js"
import Paint from "./paint.js"

const Easel = () => {
  return {
    oninit: ({ attrs: { mdl } }) => {
      if (mdl.preventUpdate()) {
        let dom = document.createElement("canvas")
        let ctx = dom.getContext("2d")
        ctx.clearRect(0, 0, 600, 600)
        Paint({ ctx, mdl })
        let image = ctx.getImageData(0, 0, mdl.width, mdl.height)
        mdl.canvas = image
        mdl.saveArt(mdl, image)
      }
    },
    view: ({ attrs: { mdl } }) =>
      m(
        ".easel",
        m(Canvas, {
          id: "canvas",
          mdl,
          classList: mdl.orientation,
          ctx: mdl.canvas
        })
      )
  }
}

export default Easel
