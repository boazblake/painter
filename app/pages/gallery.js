import m from "mithril"
import Canvas from "../components/canvas"
import Button from "../components/button"

const GalleryTools = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "aside.navbar.toolbar",
        mdl.canvas() !== null && [
          m(Button, {
            mdl,
            classList: "toolBtn",
            action: (e) => {
              e.redraw = false
              let a = document.createElement("a")
              a.href = mdl.dom().toDataURL("image/png")
              a.download = "image_name.jpg"
              a.style.display = "none"
              document.body.appendChild(a)
              a.click()
              a.remove()
            },
            download: `${mdl.canvas()}`,
            label: "Download"
          })
        ]
      )
    }
  }
}

const Modal = ({ attrs: { close } }) => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(
        ".modalBackground",
        {
          onclick: () => close()
        },
        m(".modal", [children, m(GalleryTools, { mdl })])
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
              },
              mdl
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
