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
        console.log(
          "onionit easel dom",
          dom,
          mdl.artworks(),
          mdl.canvas,
          mdl.preventUpdate()
        )
      }
    },
    oncreate: ({ dom, attrs: { mdl } }) => {
      console.log(
        "oncreate easel",
        dom,
        mdl.artworks(),
        mdl.canvas,
        typeof mdl.preventUpdate(),
        mdl.preventUpdate()
      )
    },
    view: ({ attrs: { mdl } }) => m(".easel", m(Canvas, { id: "canvas", mdl }))
  }
}

export default Easel
