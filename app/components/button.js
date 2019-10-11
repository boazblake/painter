import m from "mithril"

const Button = () => {
  return {
    view: ({ attrs: { classList, action, label } }) =>
      m(`button.btn.${classList}`, { onclick: action }, label)
  }
}

export default Button
