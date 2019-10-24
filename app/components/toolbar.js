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
          label: "New Painting",
        }),
        m(Button, {
          mdl,
          classList: "toolBtn",
          action: () => {
            mdl.preventUpdate(false)

            mdl.orientation.includes("portrait")
              ? (mdl.orientation = "animated.rollAround.landscape")
              : (mdl.orientation = "animated.rollAround.portrait")
          },
          label: mdl.orientation.includes("portrait")
            ? "landscape"
            : "portrait",
        })
      ),
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
            action: e => {
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
            label: "Download",
          }),
        ]
      )
    },
  }
}

const Toolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m.route.get() == "/easel"
        ? m(EaselTools, { mdl })
        : m(GalleryTools, { mdl }),
  }
}

export default Toolbar
