/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addLoadConfigText(layout, commander) {
    const button = document.createElement('button')

    button.className = 'button2'

    button.innerText = 'Load Config Text'

    const text = document.createElement('textarea')

    button.onclick = () => {
        if (text.value === '') return
        const config = JSON.parse(text.value)
        commander.loadConfig(config)
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('loadConfigText', div)
}
