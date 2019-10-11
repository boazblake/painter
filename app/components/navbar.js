import m from "mithril"
import Button from "./button.js"
import { isEmpty } from "../model"

const Navbar = () => {
  return {
    view: ({ attrs: { mdl } }) => {
      console.log("navbar", mdl.artworks(), m.route.get())
      return m.route.get() == "/paint"
        ? mdl.artworks.map(isEmpty) &&
            m(Button, {
              mdl,
              classList: "navBtn",
              action: () => m.route.set("/print"),
              label: "Print Picture"
            })
        : m(Button, {
            mdl,
            classList: "navBtn",
            action: () => m.route.set("/paint"),
            label: "Paint Picture"
          })
    }
  }
}

export default Navbar
