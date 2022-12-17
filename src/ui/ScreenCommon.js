/**
 * Some common properties for all screens.
 * A detail here is that we have browser pixels and device pixels.
 * Broswer pixels feel about the same size on any device (visual arc length).
 * Device pixels can be much smaller for high-dpi devices.
 * @param {Number} w - width in browser pixels of the canvas.
 * @param {Number} h - height in browser pixels of the canvas.
 */
export default function ScreenCommon(w, h) {
    const self = this

    // Publisher
    const observers = []
    self.attach = (observer) => { observers.push(observer) }

    self.width = w // measured in browser pixels
    self.height = h

    // dark mode
    self.darkMode = false
    self.setDarkMode = (val) => {
        self.darkMode = val
        const [add, remove] = (val) ? ['darkMode', 'lightMode'] : ['lightMode', 'darkMode']
        const body = document.getElementsByTagName('html')[0]
        body.classList.remove(remove)
        body.classList.add(add)

        observers.forEach((o) => { o.setDarkMode(val) })

        // https://stackoverflow.com/a/71001410
    }
    self.setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    self.showDownloadScreenLink = false
    self.setShowDownloadScreenLink = (val) => {
        self.showDownloadScreenLink = val
        observers.forEach((o) => { o.setShowDownloadScreenLink(val) })
    }
    self.svgMode = false
    self.setSvgMode = (val) => {
        self.svgMode = val
        observers.forEach((o) => { o.setSvgMode(val) })
    }
}
