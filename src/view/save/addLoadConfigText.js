/** @module */

import addUpload from './addUpload.js'

/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addLoadConfigText(layout, commander, nameInput) {
    const button = document.createElement('button')

    button.className = 'button2'

    button.innerText = 'Load Pasted Config'

    const text = document.createElement('textarea')

    button.onclick = () => {
        if (text.value === '') return
        const config = JSON.parse(text.value)
        commander.loadConfig(config)
    }

    const upload = addUpload(uploadCallback, nameInput)
    function uploadCallback(event) {
        const { result } = event.target
        const config = JSON.parse(result)
        commander.loadConfig(config)
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(upload)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('loadConfigText', div)
}
