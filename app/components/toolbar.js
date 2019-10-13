import m from "mithril"
import Button from "./button.js"

const EaselTools = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "aside.navbar",
        m(Button, {
          mdl,
          classList: "toolBtn",
          action: () => {
            mdl.preventUpdate(true)
            m.route.set("/easel")
          },
          label: "New Painting"
        }),
        m(Button, {
          mdl,
          classList: "toolBtn",
          action: () => {
            mdl.preventUpdate(false)
            mdl.orientation == "portrait"
              ? (mdl.orientation = "landscape")
              : (mdl.orientation = "portrait")
          },
          label: mdl.orientation == "portrait" ? "landscape" : "portrait"
        })
      )
  }
}

const GalleryTools = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "aside.navbar",
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

const Toolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m.route.get() == "/easel"
        ? m(EaselTools, { mdl })
        : m(GalleryTools, { mdl })
  }
}

export default Toolbar
