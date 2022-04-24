/** @module */

import C2S from '../lib/snowpack/build/snowpack/pkg/@mithrandirii/canvas2svg.js'
/**
 * add a button so that we can generate an SVG of what is being rendered
 * @param {Object} screen the screen where the drawing context is.
 * We will temporarily change the drawing context.
 * @param {Object} draw the drawing function that renders drawings to the context.
 * @param {Layout} layout
 */
export default function addSVGOutput(screen, draw, layout) {
    const w = screen.width
    const h = screen.height

    const svgUIDiv = document.createElement('div')
    layout.newElement('svgUIDiv', svgUIDiv)

    // svg output button
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Make SVG'
    button.onclick = makeSVG
    svgUIDiv.appendChild(button)

    // svg download link
    const downloadLink = document.createElement('a')
    downloadLink.innerText = 'Download SVG'
    downloadLink.download = 'vote.svg'
    downloadLink.hidden = true
    downloadLink.style.margin = '4px'
    svgUIDiv.appendChild(downloadLink)

    // svg download link for geoMaps
    const gDownloadLink = document.createElement('a')
    gDownloadLink.innerText = 'Download geoMap SVG'
    gDownloadLink.download = 'vote_geoMap.svg'
    gDownloadLink.hidden = true
    gDownloadLink.style.margin = '4px'
    svgUIDiv.appendChild(gDownloadLink)

    // svg hide button
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

    // hidden svg output div for geoMaps
    const gSvgDiv = document.createElement('div')
    gSvgDiv.setAttribute('class', 'gSvgDiv')
    gSvgDiv.style.width = `${w}px`
    gSvgDiv.style.height = `${Math.round(h / 3)}px`
    gSvgDiv.hidden = true
    svgUIDiv.appendChild(gSvgDiv)

    const svgCtx = new C2S(w, h)
    const svgGCtx = new C2S(w, Math.round(h / 3))

    function setHeightGCtx(height) {
        gSvgDiv.style.height = `${Math.round(height)}px`
        gSvgDiv.height = height
        // eslint-disable-next-line no-underscore-dangle
        svgGCtx.__root.setAttribute('height', height)
    }

    function makeSVG() {
        // temporarily swap drawing context, render SVG,
        // then output SVG to div and to a download link

        // set
        const old = screen.ctx
        const oldF = screen.fctx
        screen.setCtx(svgCtx)
        screen.setFCtx(svgCtx)
        screen.setNoBuffers(true)

        const oldG = screen.gctx
        screen.setGCtx(svgGCtx)

        // update
        const { heightBrowser } = screen.geoMaps
        setHeightGCtx(heightBrowser)

        // draw
        draw()
        outputSVG()
        outputGSVG()

        // unset
        screen.setCtx(old)
        screen.setFCtx(oldF)
        screen.setNoBuffers(false)

        screen.setGCtx(oldG)
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
    function outputGSVG() {
        const gSvg = svgGCtx.getSerializedSvg(true)
        gSvgDiv.innerHTML = gSvg
        gSvgDiv.hidden = false
        gDownloadLink.hidden = false
        const gUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(gSvg)}`
        gDownloadLink.href = gUrl
    }

    function hideSVG() {
        svgHideButton.hidden = true

        svgDiv.hidden = true
        downloadLink.hidden = true

        gSvgDiv.hidden = true
        gDownloadLink.hidden = true
    }
}
