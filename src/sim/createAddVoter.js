/** @module */

/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {SimAddVoters} simAddVoters
 */
export default function createAddVoter(layout, simAddVoters) {
    const addVoterButton = document.createElement('button')

    addVoterButton.innerText = 'Add Voter'
    addVoterButton.className = 'button2'

    addVoterButton.onclick = () => {
        simAddVoters.addVoterPressed()
    }

    layout.newElement('addVoter', addVoterButton)
}
