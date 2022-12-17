/** @module */
/**
 * Make the download link part of the screen.
 */
export default function ScreenDownload(screen) {
    const self = this

    self.div = document.createElement('div')

    const makeSvgButton = document.createElement('button')
    makeSvgButton.className = 'button2'
    makeSvgButton.innerText = 'Make SVG'
    makeSvgButton.onclick = makeSVG

    const downloadLink = document.createElement('a')
    downloadLink.innerText = 'Background'
    downloadLink.download = 'vote.svg'
    downloadLink.style.margin = '4px'

    const downloadLinkF = document.createElement('a')
    downloadLinkF.innerText = 'Foreground'
    downloadLinkF.download = 'vote.svg'
    downloadLinkF.style.margin = '4px'

    self.div.append(makeSvgButton)
    self.div.appendChild(downloadLink)
    self.div.appendChild(downloadLinkF)

    self.setShowDownloadScreenLink = (show) => {
        if (show) {
            makeSvgButton.hidden = false
            downloadLink.hidden = false
            downloadLinkF.hidden = false
        } else {
            makeSvgButton.hidden = true
            downloadLink.hidden = true
            downloadLinkF.hidden = true
        }
    }
    self.setShowDownloadScreenLink(screen.common.showDownloadScreenLink)

    function makeSVG() {
        const svg = screen.svg.ctx.getSerializedSvg(true)
        const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
        downloadLink.href = url

        const svgF = screen.svg.fctx.getSerializedSvg(true)
        const urlF = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgF)}`
        downloadLinkF.href = urlF
    }
}
