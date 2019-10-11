import m from "mithril"

const Art = () => {
  return {
    oncreate: ({ dom, attrs: { ctx } }) => {
      let newCtx = dom.getContext("2d")
      ctx && newCtx.putImageData(ctx, 0, 0)
    },
    view: ({ attrs: { classList, id } }) => m(`canvas.${classList}`, { id })
  }
}

export default Art
