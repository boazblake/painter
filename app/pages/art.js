import m from "mithril"

const Art = () => {
  return {
    oncreate: ({ dom, attrs: { ctx, mdl } }) => {
      let newCtx = dom.getContext("2d")
      ctx && newCtx.putImageData(ctx.art, 0, 0)
    },
    view: ({ attrs: { classList, id } }) => m(`canvas.${classList}`, { id })
  }
}

export default Art
