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

    // svg download link for maps
    const mDownloadLink = document.createElement('a')
    mDownloadLink.innerText = 'Download Map SVG'
    mDownloadLink.download = 'vote_map.svg'
    mDownloadLink.hidden = true
    mDownloadLink.style.margin = '4px'
    svgUIDiv.appendChild(mDownloadLink)

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

    // hidden svg output div for maps
    const mSvgDiv = document.createElement('div')
    mSvgDiv.setAttribute('class', 'mSvgDiv')
    mSvgDiv.style.width = `${w}px`
    mSvgDiv.style.height = `${Math.round(h / 3)}px`
    mSvgDiv.hidden = true
    svgUIDiv.appendChild(mSvgDiv)

    const svgCtx = new C2S(w, h)
    const svgMCtx = new C2S(w, Math.round(h / 3))

    function setHeightGCtx(height) {
        mSvgDiv.style.height = `${Math.round(height)}px`
        mSvgDiv.height = height
        // eslint-disable-next-line no-underscore-dangle
        svgMCtx.__root.setAttribute('height', height)
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

        const oldM = screen.mctx
        screen.setMCtx(svgMCtx)

        // update
        const { heightBrowser } = screen.maps
        setHeightGCtx(heightBrowser)

        // draw
        draw()
        outputSVG()
        outputMSVG()

        // unset
        screen.setCtx(old)
        screen.setFCtx(oldF)
        screen.setNoBuffers(false)

        screen.setMCtx(oldM)
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
    function outputMSVG() {
        const mSvg = svgMCtx.getSerializedSvg(true)
        mSvgDiv.innerHTML = mSvg
        mSvgDiv.hidden = false
        mDownloadLink.hidden = false
        const mUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(mSvg)}`
        mDownloadLink.href = mUrl
    }

    function hideSVG() {
        svgHideButton.hidden = true

        svgDiv.hidden = true
        downloadLink.hidden = true

        mSvgDiv.hidden = true
        mDownloadLink.hidden = true
    }
}
