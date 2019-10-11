import m from "mithril"
import Button from "./button.js"

const Navbar = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m.route.get() == "/paint"
        ? !mdl.artworks.length == 0 &&
          m(Button, {
            mdl,
            classList: "navBtn",
            action: () => m.route.set("/print"),
            label: "Print Picture"
          })
        : m("nav.navbar", [
            m(Button, {
              mdl,
              classList: "navBtn",
              action: () => m.route.set("/paint"),
              label: "Paint Picture"
            })
          ])
  }
}

export default Navbar
