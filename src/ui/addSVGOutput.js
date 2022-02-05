/** @module */

import { C2S } from '../../lib/canvas2svg.esm.js'
/**
 * add a button so that we can generate an SVG of what is being rendered
 * @param {Object} screen the screen where the drawing context is.
 * We will temporarily change the drawing context.
 * @param {Object} draw the drawing function that renders drawings to the context.
 */
export default function addSVGOutput(screen, draw) {
    const w = screen.width
    const h = screen.height

    const svgUIDiv = document.createElement('div')

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

    const svgCtx = new C2S(w, h)

    function makeSVG() {
        // temporarily swap drawing context, render SVG,
        // then output SVG to div and to a download link
        const old = screen.ctx
        screen.setCtx(svgCtx)
        screen.setNoBuffers(true)
        draw()
        outputSVG()
        screen.setCtx(old)
        screen.setNoBuffers(false)
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

    return svgUIDiv
}
