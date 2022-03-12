/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addSaveConfigToText(layout, commander) {
    const button = document.createElement('button')

    button.className = 'button2'

    button.innerText = 'Save Config To Text'

    button.onclick = () => {
        const config = commander.getConfig()
        console.log(config)
    }

    layout.newElement('saveConfigToText', button)
}
