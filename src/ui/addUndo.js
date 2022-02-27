/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addUndo(layout, commander) {
    const undoButton = document.createElement('button')
    const redoButton = document.createElement('button')

    undoButton.innerText = 'Undo'
    redoButton.innerText = 'Redo'

    undoButton.onclick = commander.undo
    redoButton.onclick = commander.redo

    const div = document.createElement('div')
    div.appendChild(undoButton)
    div.appendChild(redoButton)
    layout.newDiv('undo', div)
}
