import m from "mithril"
import Canvas from "../components/canvas"
import Button from "../components/button"
import { animateComponentEntrance } from "../model.js"

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
              a.download = `AI_Painter_lot#${mdl.artworks().length}.jpg`
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
    oncreate: ({ dom }) => [].map((c) => dom.classList.add(c)),
    view: ({ state, attrs: { mdl } }) => {
      return [
        m(
          ".gallery",
          mdl.artworks().map(({ art }, idx) => {
            return m(Button, {
              oncreate: animateComponentEntrance(idx, "fadeInDownSmall"),
              classList: "paintBtn.animated",
              action: (e) => {
                let dom = e.target
                let ctx = dom.getContext("2d")
                ctx.filter = "brightness(1)"
                let image = ctx.getImageData(0, 0, mdl.width(), mdl.height())
                mdl.canvas(image)
                mdl.dom(dom)
                state.close(state)
                window.scrollTo(0, 0)
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
