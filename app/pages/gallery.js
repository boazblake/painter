import m from "mithril"
import Canvas from "../components/canvas"

const Gallery = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        ".gallery",
        mdl
          .artworks()
          .map(({ art }) => m(Canvas, { mdl, ctx: art, classList: "canvas" }))
      )
    }
  }
}

export default Gallery
