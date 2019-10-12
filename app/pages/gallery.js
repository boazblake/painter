import m from "mithril"
import Art from "./art"

const Gallery = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      console.log("gallery", mdl.artworks())
      return m(
        ".gallery",
        mdl
          .artworks()
          .map(({ art }) => m(Art, { mdl, ctx: art, classList: "canvas" }))
      )
    }
  }
}

export default Gallery
