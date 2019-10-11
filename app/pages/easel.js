import m from "mithril"
import Canvas from "./canvas.js"
import Paint from "./paint.js"

const Easel = () => {
  return {
    oncreate: ({ attrs: { mdl } }) => {
      let dom = document.getElementById("canvas")
      let ctx = dom.getContext("2d")
      ctx.clearRect(0, 0, 600, 600)
      Paint({ ctx, mdl })
      let image = ctx.getImageData(0, 0, mdl.width, mdl.height)
      mdl.canvas = image
    },
    onbeforeupdate: ({ attrs: { mdl } }) => {
      // console.log(dom)
      let dom = document.getElementById("canvas")
      let ctx = dom.getContext("2d")
      let image = ctx.getImageData(0, 0, mdl.width, mdl.height)
      mdl.saveArt(mdl, image)
      ctx.clearRect(0, 0, 600, 600)
      Paint({ ctx, mdl })
    },
    onbeforeremove: ({ attrs: { mdl } }) => {
      // console.log(dom)
      let dom = document.getElementById("canvas")
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
