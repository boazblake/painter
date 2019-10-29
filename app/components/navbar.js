import m from "mithril"
import Button from "./button.js"
import { isEmpty } from "../model"

const Navbar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "nav.navbar",
        m.route.get() == "/easel"
          ? mdl.artworks.map(isEmpty) &&
              m(Button, {
                mdl,
                classList: "navBtn",
                action: () => {
                  mdl.preventUpdate(false)
                  mdl.orientation = "portrait"
                  m.route.set("/print")
                },
                label: "View Gallery"
              })
          : m(Button, {
              mdl,
              classList: "navBtn",
              action: () => {
                mdl.preventUpdate(true)
                m.route.set("/easel")
              },
              label: "Commision New Painting"
            })
      )
    }
  }
}

export default Navbar
