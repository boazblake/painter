import m from "mithril"
import Button from "./button.js"

const PaintTools = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".toolbar",
        m(Button, {
          mdl,
          classList: "toolBtn",
          action: () => {},
          label: "New Painting"
        })
      )
  }
}

const PrintTools = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".toolbar", [
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
      m.route.get() == "/paint"
        ? m(PaintTools, { mdl })
        : m(PrintTools, { mdl })
  }
}

export default Toolbar
