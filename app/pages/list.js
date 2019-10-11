import m from "mithril"
import Art from "./art"

const List = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "ul.list",
        mdl.artworks.map(({ id, art }) => {
          console.log("list item", id)
          return m(Art, { mdl, ctx: art, classList: "listItem" })
        })
      )
  }
}

export default List
