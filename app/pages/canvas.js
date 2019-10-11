import m from "mithril"
import Art from "./art"

const Canvas = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      console.log("mdl.canvas", mdl.canvas)
      return m(
        ".canvas",
        m(Art, { id: "canvas", mdl, classList: "canvas", ctx: mdl.canvas })
      )
    }
  }
}

export default Canvas
