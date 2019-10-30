import m from "mithril"

const Canvas = () => {
  return {
    onbeforeupdate: ({ dom }) => {
      console.log("update", dom)
    },
    onbeforeremove: ({ dom }) => {
      console.log("remove", dom)
    },
    oncreate: ({ dom, attrs: { ctx, mdl } }) => {
      let newCtx = dom.getContext("2d")
      ctx && newCtx.putImageData(ctx, 0, 0)
    },
    view: ({ attrs: { classList, id } }) => m(`canvas.${classList}`, { id })
  }
}

export default Canvas
