import m from "mithril"

const Canvas = () => {
  return {
    oncreate: ({ dom, attrs: { ctx, mdl } }) => {
      let newCtx = dom.getContext("2d")
      ctx && newCtx.putImageData(ctx, 0, 0)
      dom.style.transform = `rotate(${mdl.rotateCanvas()}deg)`
    },
    view: ({ attrs: { classList, id } }) => m(`canvas.${classList}`, { id })
  }
}

export default Canvas
