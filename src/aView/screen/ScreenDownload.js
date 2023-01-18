/** @module */
/**
 * Make the download link part of the screen.
 */
export default function ScreenDownload(screen, viewMode) {
    const self = this

    self.div = document.createElement('div')

    const makeSvgButton = document.createElement('button')
    makeSvgButton.className = 'button2'
    makeSvgButton.innerText = 'Make SVG'
    makeSvgButton.onclick = makeSVG

    const downloadLink = document.createElement('a')
    downloadLink.innerText = 'vote.svg'
    downloadLink.download = 'vote.svg'
    downloadLink.style.margin = '4px'

    self.div.append(makeSvgButton)
    self.div.appendChild(downloadLink)

    self.setShowDownloadScreenLink = (show) => {
        if (show) {
            makeSvgButton.hidden = false
            downloadLink.hidden = false
        } else {
            makeSvgButton.hidden = true
            downloadLink.hidden = true
        }
    }
    self.setShowDownloadScreenLink(screen.common.showDownloadScreenLink)

    function makeSVG() {
        screen.setFCtx(screen.svg.ctx)

        viewMode.clear()
        viewMode.render()
        viewMode.renderForeground()

        const svg = screen.svg.ctx.getSerializedSvg(true)
        const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
        downloadLink.href = url

        screen.setFCtx(screen.svg.fctx)

        viewMode.rerender()
    }
}
