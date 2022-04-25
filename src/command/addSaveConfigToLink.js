/** @module */

/**
 * Add buttons for saving the configuration to a link.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToLink(layout, commander, sandboxURL) {
    const button = document.createElement('button')
    button.className = 'button2'
    button.innerText = 'Save Link'

    const button2 = document.createElement('button')
    button2.className = 'button2'
    button2.innerText = 'Copy Link to Clipboard'

    const text = document.createElement('textarea')

    button.onclick = () => {
        const link = getLink()
        text.value = link
    }
    button2.onclick = () => {
        const link = getLink()
        navigator.clipboard.writeText(link)
    }
    function getLink() {
        const config = commander.getConfig()
        const string = JSON.stringify(config)
        const encoded = encodeURIComponent(string)
        const params = new URLSearchParams({ a: encoded })
        const search = params.toString()
        const currentUrlFolder = getFolder()

        const link = `${currentUrlFolder}/${sandboxURL}?${search}`
        return link
    }
    function getFolder() {
        const sp = document.location.href.split('/')
        const sl = sp.slice(0, sp.length - 1)
        const folder = sl.join('/')
        return folder
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(button2)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('saveConfigToLink', div)
}
