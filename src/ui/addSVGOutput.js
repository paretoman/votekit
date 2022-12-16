/** @module */

import C2S from '../lib/snowpack/build/snowpack/pkg/@mithrandirii/canvas2svg.js'
/**
 * add a button so that we can generate an SVG of what is being rendered
 * @param {Object} screen the screen where the drawing context is.
 * We will temporarily change the drawing context.
 * @param {Object} draw the drawing function that renders drawings to the context.
 * @param {Layout} layout
 */
export default function addSVGOutput(screen, draw, layout, divName) {
    const w = screen.width
    const h = screen.height

    const svgUIDiv = document.createElement('div')
    layout.newElement(divName, svgUIDiv)

    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Make SVG'
    button.onclick = makeSVG
    svgUIDiv.appendChild(button)

    const downloadLink = document.createElement('a')
    downloadLink.innerText = 'Download SVG'
    downloadLink.download = 'vote.svg'
    downloadLink.hidden = true
    downloadLink.style.margin = '4px'
    svgUIDiv.appendChild(downloadLink)

    const svgHideButton = document.createElement('button')
    svgHideButton.className = 'button2'
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

    const svgCtx = new C2S(w, h)

    function makeSVG() {
        // temporarily swap drawing context, render SVG,
        // then output SVG to div and to a download link

        // set
        const old = screen.ctx
        const oldF = screen.fctx
        screen.setCtx(svgCtx)
        screen.setFCtx(svgCtx)
        screen.setNoBuffers(true)

        // draw
        draw()
        outputSVG()

        // unset
        screen.setCtx(old)
        screen.setFCtx(oldF)
        screen.setNoBuffers(false)
    }

    function outputSVG() {
        svgHideButton.hidden = false

        const svg = svgCtx.getSerializedSvg(true)
        svgDiv.innerHTML = svg
        svgDiv.hidden = false
        downloadLink.hidden = false
        const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
        downloadLink.href = url
    }

    function hideSVG() {
        svgHideButton.hidden = true

        svgDiv.hidden = true
        downloadLink.hidden = true
    }
}
