

export default function Screen(id,w,h) {

    // set up a screen to view some objects

    // A detail here is that we have browser pixels and device pixels.
    // Broswer pixels feel about the same size on any device. (visual arc length)
    // Device pixels can be much smaller for high-dpi devices.

    let self = this

    self.width = w // measured in browser pixels
    self.height = h

    // find id in divs
    let div = document.getElementById(id)
    let parent = div.parentElement
    
    // attach canvas
    self.canvas = document.createElement('canvas')
    self.canvas.setAttribute("class","interactive")
    parent.appendChild(self.canvas)


    self.ctx = self.canvas.getContext("2d")

    // use scaling for high DPI devices instead of multiplying every time inside draw calls
    // https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    self.pixelRatio = getPixelRatio(self.ctx)

    self.canvas.width = w * self.pixelRatio // measured in device pixels
    self.canvas.height = h * self.pixelRatio

    self.canvas.style.width = w + "px"
    self.canvas.style.height = h + "px"

    self.ctx.scale(self.pixelRatio,self.pixelRatio)
    self.clear = function() {
        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
    }

}

export function addSVGOutput(screen,draw) {


    let w = screen.width
    let h = screen.height

    let svgUIDiv = document.createElement('div')
    screen.canvas.parentNode.appendChild(svgUIDiv)

    // svg output button
    let button = document.createElement('button')
    button.innerText = "Make SVG"
    button.onclick = makeSVG
    svgUIDiv.appendChild(button)

    // svg download link
    let downloadLink = document.createElement('a')
    downloadLink.innerText = "Download SVG"
    downloadLink.download = "vote.svg"
    downloadLink.hidden = true
    svgUIDiv.appendChild(downloadLink)

    // svg hide button
    let svgHideButton = document.createElement('button')
    svgHideButton.innerText = "Hide SVG"
    svgHideButton.hidden = true
    svgHideButton.onclick = hideSVG
    svgUIDiv.appendChild(svgHideButton)
    
    // hidden svg output div
    let svgDiv = document.createElement('div')
    svgDiv.setAttribute("class","svgDiv")
    svgDiv.style.width = w + "px"
    svgDiv.style.height = h + "px"
    svgDiv.hidden = true
    svgUIDiv.appendChild(svgDiv)

    let svgCtx = new C2S(w,h)
    
    function makeSVG() {
        // temporarily swap drawing context, render SVG, then output SVG to div and to a download link
        let old = screen.ctx
        screen.ctx = svgCtx
        draw()
        outputSVG()
        screen.ctx = old
    }

    function outputSVG() {
        let svg = svgCtx.getSerializedSvg(true)
        svgDiv.innerHTML = svg
        svgDiv.hidden = false
        svgHideButton.hidden = false
        downloadLink.hidden = false

        let url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)
        downloadLink.href = url
    }

    function hideSVG() {
        svgDiv.hidden = true
        svgHideButton.hidden = true
        downloadLink.hidden = true
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
