/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function addUndo(layout, commander) {
    const undoButton = document.createElement('button')
    const redoButton = document.createElement('button')

    undoButton.className = 'button2'
    redoButton.className = 'button2'

    undoButton.innerText = 'Undo'
    redoButton.innerText = 'Redo'

    undoButton.onclick = commander.undo
    redoButton.onclick = commander.redo

    layout.newElement('undo', undoButton)
    layout.newElement('redo', redoButton)
}
