/** @module */

/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {VoterShapeAdd} voterShapeAdd
 */
export default function VoterShapeAddMakeButton(layout, voterShapeAdd) {
    const addVoterButton = document.createElement('button')

    addVoterButton.innerText = 'Add Voter'
    addVoterButton.className = 'button2'

    addVoterButton.onclick = () => {
        voterShapeAdd.addVoterPressed()
    }

    layout.newElement('addVoter', addVoterButton)
}
