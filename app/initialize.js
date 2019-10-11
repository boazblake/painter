import m from "mithril"
import Model, { isEmpty } from "./model.js"
import Navbar from "./components/navbar"
import Toolbar from "./components/toolbar"
import Easel from "./pages/easel.js"
import Printer from "./pages/printer.js"

const Main = () => {
  return { view: ({ children }) => m("section.main", children) }
}

const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".app", [
        m(Navbar, { mdl }),
        m(Main, { mdl }, children),
        m(Toolbar, { mdl })
      ])
  }
}

const routes = (mdl) => {
  return {
    "/paint": { render: () => m(Layout, { mdl }, m(Easel, { mdl })) },
    "/print": {
      onmatch: (a, b, c) => {
        if (mdl.artworks().length == 0) return m.route.set("/paint")
      },
      render: () => m(Layout, { mdl }, m(Printer, { mdl }))
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.route(root, "/print", routes(Model))
})
