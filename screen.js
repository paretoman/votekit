
export default function Screen(id,w,h) {

    let self = this
    
    self.canvas = document.createElement('canvas')

    // find id in divs and attach canvas
    let div = document.getElementById(id)
    let parent = div.parentElement
    parent.appendChild(self.canvas)
    
    self.ctx = self.canvas.getContext("2d")

    // use scaling for high DPI devices instead of multiplying every time inside draw calls
    // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    self.pixelRatio = getPixelRatio(self.ctx)

    self.canvas.width = w * self.pixelRatio
    self.canvas.height = h * self.pixelRatio

    self.canvas.style.width = w
    self.canvas.style.height = h

    self.ctx.scale(self.pixelRatio,self.pixelRatio)

}


function getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
};
