import m from "mithril"
import Art from "./art"

const Canvas = () => {
  return {
    view: ({ attrs: { id, mdl } }) =>
      m(".canvas", m(Art, { id, mdl, classList: "canvas", ctx: mdl.canvas }))
  }
}

export default Canvas
