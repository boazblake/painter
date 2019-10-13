import m from "mithril"
import Model, { isEmpty } from "./model.js"
import Navbar from "./components/navbar"
import Toolbar from "./components/toolbar"
import Easel from "./pages/easel.js"
import Gallery from "./pages/gallery.js"

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
    "/easel": {
      render: () => m(Layout, { mdl }, m(Easel, { mdl, key: Date.now() }))
    },
    "/gallery": {
      onmatch: (a, b, c) => {
        if (mdl.artworks().length == 0) return m.route.set("/easel")
      },
      render: () => m(Layout, { mdl }, m(Gallery, { mdl }))
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.route(root, "/gallery", routes(Model))
})
