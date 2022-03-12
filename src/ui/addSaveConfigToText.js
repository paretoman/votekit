/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToText(layout, commander) {
    const button = document.createElement('button')

    button.className = 'button2'

    button.innerText = 'Save Config To Text'

    const text = document.createElement('textarea')

    button.onclick = () => {
        const config = commander.getConfig()
        console.log(config)

        text.value = JSON.stringify(config)
    }

    const clearDiv = document.createElement('div')

    const div = document.createElement('div')
    div.appendChild(button)
    div.appendChild(clearDiv)
    div.appendChild(text)

    layout.newElement('saveConfigToText', div)
}
