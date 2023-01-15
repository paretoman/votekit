export default function DownloadLink(text) {
    const self = this

    const downloadLink = document.createElement('a')
    downloadLink.innerText = text
    downloadLink.download = text
    downloadLink.style.margin = '4px'
    self.div = downloadLink

    self.show = () => {
        downloadLink.hidden = false
    }
    self.hide = () => {
        downloadLink.hidden = true
    }
    self.setUrl = (url) => {
        downloadLink.href = url
    }
    self.setFileName = (fn) => {
        downloadLink.download = fn
    }
}
