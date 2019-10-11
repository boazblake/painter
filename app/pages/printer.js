import m from "mithril"
import Art from "./art"

import { rest } from "../model"

const Printer = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl } }) => {
      console.log(mdl.artworks())
      return m(
        ".Printer",
        mdl
          .artworks()
          .map((art) => m(Art, { mdl, ctx: art, classList: "canvas" }))
      )
    }
  }
}

export default Printer
