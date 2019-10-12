import m from "mithril"
import Art from "./art"

const Canvas = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        ".canvas",
        m(Art, { id: "canvas", mdl, classList: "", ctx: mdl.canvas })
      )
    }
  }
}

export default Canvas
