import m from "mithril"
import Canvas from "./canvas.js"
import Paint from "./paint.js"

const Easel = () => {
  return {
    oncreate: ({ attrs: { mdl } }) => {
      let dom = document.getElementById("canvas")
      console.log("oncreate", dom)
      let ctx = dom.getContext("2d")
      let image = ctx.getImageData(0, 0, mdl.width, mdl.height)
      mdl.saveArt(mdl, image)
      ctx.clearRect(0, 0, 600, 600)
      Paint({ ctx, mdl })
    },
    onupdate: ({ attrs: { mdl } }) => {
      let dom = document.getElementById("canvas")
      console.log("onupdate", dom)
      let ctx = dom.getContext("2d")
      let image = ctx.getImageData(0, 0, mdl.width, mdl.height)
      mdl.saveArt(mdl, image)
      ctx.clearRect(0, 0, 600, 600)
      Paint({ ctx, mdl })
    },
    view: ({ attrs: { mdl } }) => m(".easel", m(Canvas, { id: "canvas", mdl }))
  }
}

export default Easel
