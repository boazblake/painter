import m from "mithril"
import Canvas from "../components/canvas"
import Button from "../components/button"

const Modal = ({ attrs: { close } }) => {
  return {
    view: ({ children, attrs: { close } }) =>
      m(
        ".modalBackground",
        {
          onclick: () => close()
        },
        m(".modal", children)
      )
  }
}

const resetModal = ({ attrs: { mdl } }) => mdl.canvas(null)

const Gallery = () => {
  return {
    show: false,
    close: (state) => (state.show = !state.show),
    oninit: resetModal,
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
                mdl.dom(dom)
                state.close(state)
              },
              label: m(Canvas, { mdl, ctx: art, classList: "canvas" })
            })
          })
        ),
        state.show &&
          m(
            Modal,
            {
              close: () => {
                resetModal({ attrs: { mdl } })
                state.close(state)
              }
            },
            m(Canvas, {
              ctx: mdl.canvas(),
              classList: "canvas"
            })
          )
      ]
    }
  }
}

export default Gallery
