import m from "mithril"
import Model from "./model.js"
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
        console.log("models length", mdl, mdl.artworks.length)
        if (mdl.artworks.length == 0) return m.route.SKIP
      },
      render: () => m(Layout, { mdl }, m(Printer, { mdl }))
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // do your setup here
  const root = document.body
  console.log("Initialized app")

  m.route(root, "/paint", routes(Model))
})
