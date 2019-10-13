import m from "mithril"
import Canvas from "../components/canvas.js"
import Paint from "../paint.js"

const Easel = () => {
  return {
    oninit: ({ attrs: { mdl } }) => {
      if (mdl.preventUpdate()) {
        let dom = document.createElement("canvas")
        let ctx = dom.getContext("2d")
        ctx.imageSmoothingQuality = "high"
        ctx.filter = "brightness(0.8)"
        Paint({ ctx, mdl })
        let image = ctx.getImageData(0, 0, mdl.width(), mdl.height())
        console.log(ctx, image)
        mdl.canvas(image)
        mdl.ctx(ctx)
        mdl.dom(dom)
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
          ctx: mdl.canvas()
        })
      )
  }
}

export default Easel
