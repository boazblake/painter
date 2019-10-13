import m from "mithril"
import Canvas from "../components/canvas"
import Button from "../components/button"

const Modal = () => {
  return {
    view: ({ children, attrs: { close } }) =>
      m(
        ".modalBackground",
        {
          onclick: () => close
        },
        m(".modal", children)
      )
  }
}

const Gallery = () => {
  return {
    show: false,
    close: (state) => (state.show = !state.show),
    oninit: ({ attrs: { mdl } }) => mdl.canvas(null),
    view: ({ state, attrs: { mdl } }) => {
      return [
        m(
          ".gallery",
          mdl.artworks().map(({ art }) => {
            return m(Button, {
              classList: "paintBtn",
              action: (e) => {
                let dom = e.target
                let ctx = dom.getContext("2d")
                ctx.filter = "brightness(1)"
                let image = ctx.getImageData(0, 0, mdl.width(), mdl.height())

                mdl.canvas(image)
                state.close(state)
              },
              label: m(Canvas, { mdl, ctx: art, classList: "canvas" })
            })
          })
        ),
        state.show &&
          m(
            Modal,
            m(Canvas, {
              close: state.close(state),
              ctx: mdl.canvas(),
              classList: "canvas"
            })
          )
      ]
    }
  }
}

export default Gallery
