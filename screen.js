

export  function Screen(id,w,h) {

    let self = this
    
    self.canvas = document.createElement('canvas')
    self.canvas.setAttribute("class","interactive")

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

    self.canvas.style.width = w + "px"
    self.canvas.style.height = h + "px"

    self.ctx.scale(self.pixelRatio,self.pixelRatio)
    self.clear = function() {
        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
    }
    self.switchToSVG()
}

export function SVGScreen(id,w,h) {
    
    let self = this

    var ctx = new C2S(w,h)

    self.ctx = ctx

    self.canvas = document.createElement('div')
    self.canvas.setAttribute("class","interactive")

    // find id in divs and attach canvas
    let div = document.getElementById(id)
    let parent = div.parentElement
    parent.appendChild(self.canvas)

    let button = document.createElement('a')
    button.innerText = "SVG"
    button.download = "vote.svg"
    parent.appendChild(button)
    
    // use scaling for high DPI devices instead of multiplying every time inside draw calls
    // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    self.pixelRatio = getPixelRatio(self.ctx)

    self.canvas.width = w
    self.canvas.height = h

    self.canvas.style.width = w + "px"
    self.canvas.style.height = h + "px"

    // self.ctx.scale(self.pixelRatio,self.pixelRatio)
    self.render = function() {
        let svg = ctx.getSerializedSvg(true)
        self.canvas.innerHTML = svg

        let url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)
        button.href = url
    }
    self.clear = function() {
        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
    }
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
