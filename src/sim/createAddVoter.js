/** @module */

/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function createAddVoter(layout, sim) {
    const addVoterButton = document.createElement('button')

    addVoterButton.innerText = 'Add Voter'
    addVoterButton.className = 'button2'

    addVoterButton.onclick = () => {
        sim.addVoterPressed()
    }

    layout.newElement('addVoter', addVoterButton)
}
