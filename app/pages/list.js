import m from "mithril"
import Art from "./art"

const List = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "ul.list",
        mdl.artworks().map((art) => {
          console.log("arts", art)
          m(Art, { mdl, ctx: art, classList: "canvas" })
        })
      )
  }
}

export default List
