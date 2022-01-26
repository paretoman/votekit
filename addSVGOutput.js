export default function addSVGOutput(screen, draw) {

    // add a button so that we can generate an SVG of what is being rendered
    // Two arguments: (1) the screen where the drawing context is (so that the drawing context can be temporarily replaced),
    //   (2) the drawing function that renders drawings to the context.

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