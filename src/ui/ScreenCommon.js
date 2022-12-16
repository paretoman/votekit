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

        // self.ctx.strokeStyle = '#555'
        // if (self.darkMode) self.ctx.strokeStyle = '#ddd'
        // https://stackoverflow.com/a/71001410
    }
    self.setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
}
