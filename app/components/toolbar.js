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
            mdl.orientation = "portrait"
            m.route.set("/easel")
          },
          label: "New Painting"
        }),
        m(Button, {
          mdl,
          classList: "toolBtn",
          action: () => {
            mdl.preventUpdate(false)
            mdl.orientation = "portrait.animated"
            mdl.rotateCanvas(
              mdl.rotateCanvas() + 90 >= 360 ? 0 : mdl.rotateCanvas() + 90
            )
            m.route.set("/easel")
          },
          label: "Rotate Painting Clockwise"
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
          label: mdl.orientation.includes("portrait") ? "landscape" : "portrait"
        })
      )
  }
}

const Toolbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m.route.get() == "/easel" && m(EaselTools, { mdl })
  }
}

export default Toolbar
