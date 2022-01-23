
export default function Screen(config,w,h) {

    let self = this
    
    self.canvas = document.createElement('canvas')
    let div = document.getElementById(config.idScript)
    let parent = div.parentElement
    parent.appendChild(self.canvas)
    
    self.ctx = self.canvas.getContext("2d")
    self.pixelRatio = getPixelRatio(self.ctx)
    self.canvas.width = w * self.pixelRatio
    self.canvas.height = h * self.pixelRatio
    self.canvas.style.width = w
    self.canvas.style.height = h

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
