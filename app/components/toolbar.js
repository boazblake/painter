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

const PrintTools = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m("aside.navbar", [
        m(Button, {
          mdl,
          classList: "toolBtn",
          action: () => console.log("download", mdl),
          label: "Download"
        }),
        m(Button, {
          mdl,
          classList: "toolBtn",
          action: () => console.log("email", mdl),
          label: "Email"
        })
      ])
  }
}

const Toolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m.route.get() == "/easel"
        ? m(EaselTools, { mdl })
        : m(PrintTools, { mdl })
  }
}

export default Toolbar
