export default function DownloadLink(text) {
    const self = this

    self.div = document.createElement('div')

    const downloadLink = document.createElement('a')
    downloadLink.innerText = text
    downloadLink.download = text
    downloadLink.style.margin = '4px'
    self.div.append(downloadLink)

    const hideLink = document.createElement('button')
    hideLink.className = 'button2'
    hideLink.innerText = 'X'
    hideLink.onclick = () => { self.hide() }
    self.div.append(hideLink)

    self.show = () => {
        downloadLink.hidden = false
        hideLink.hidden = false
    }
    self.hide = () => {
        downloadLink.hidden = true
        hideLink.hidden = true
    }
    self.setUrl = (url) => {
        downloadLink.href = url
    }
    self.setFileName = (fn) => {
        downloadLink.download = fn
    }
}
