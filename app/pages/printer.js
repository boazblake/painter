import m from "mithril"
import List from "./list"

const Printer = () => {
  return {
    view: ({ attrs: { mdl } }) => m(".Printer", m(List, { mdl }))
  }
}

export default Printer
