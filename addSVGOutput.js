export default function addSVGOutput(screen, draw) {
    // add a button so that we can generate an SVG of what is being rendered
    // Two arguments:
    //   (1) the screen where the drawing context is
    //       (so that the drawing context can be temporarily replaced),
    //   (2) the drawing function that renders drawings to the context.

    const w = screen.width
    const h = screen.height

    const svgUIDiv = document.createElement('div')
    screen.canvas.parentNode.appendChild(svgUIDiv)

    // svg output button
    const button = document.createElement('button')
    button.innerText = 'Make SVG'
    button.onclick = makeSVG
    svgUIDiv.appendChild(button)

    // svg download link
    const downloadLink = document.createElement('a')
    downloadLink.innerText = 'Download SVG'
    downloadLink.download = 'vote.svg'
    downloadLink.hidden = true
    svgUIDiv.appendChild(downloadLink)

    // svg hide button
    const svgHideButton = document.createElement('button')
    svgHideButton.innerText = 'Hide SVG'
    svgHideButton.hidden = true
    svgHideButton.onclick = hideSVG
    svgUIDiv.appendChild(svgHideButton)

    // hidden svg output div
    const svgDiv = document.createElement('div')
    svgDiv.setAttribute('class', 'svgDiv')
    svgDiv.style.width = `${w}px`
    svgDiv.style.height = `${h}px`
    svgDiv.hidden = true
    svgUIDiv.appendChild(svgDiv)

    const svgCtx = new window.C2S(w, h)

    function makeSVG() {
        // temporarily swap drawing context, render SVG,
        // then output SVG to div and to a download link
        const old = screen.ctx
        screen.ctx = svgCtx
        screen.noBuffers = true
        draw()
        outputSVG()
        screen.ctx = old
        screen.noBuffers = undefined
    }

    function outputSVG() {
        const svg = svgCtx.getSerializedSvg(true)
        svgDiv.innerHTML = svg
        svgDiv.hidden = false
        svgHideButton.hidden = false
        downloadLink.hidden = false

        const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
        downloadLink.href = url
    }

    function hideSVG() {
        svgDiv.hidden = true
        svgHideButton.hidden = true
        downloadLink.hidden = true
    }
}
