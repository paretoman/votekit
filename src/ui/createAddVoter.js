/**
 * Add buttons to layout for undo and redo, and connect them to commander for functionality.
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function createAddVoter(layout, sim) {
    const addVoterButton = document.createElement('button')

    addVoterButton.innerText = 'Add Voter'

    addVoterButton.onclick = () => {
        sim.addVoter()
    }

    const div = document.createElement('div')
    div.appendChild(addVoterButton)
    layout.newDiv('addVoter', div)
}
