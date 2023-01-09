/** @module */

/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {VoterShapeList} voterShapeList
 */
export default function VoterShapeAddMakeButton(layout, voterShapeList) {
    const addVoterButton = document.createElement('button')

    addVoterButton.innerText = 'Add Voter'
    addVoterButton.className = 'button2'

    addVoterButton.onclick = () => {
        voterShapeList.addVoterPressed()
    }

    layout.newElement('addVoter', addVoterButton)
}
