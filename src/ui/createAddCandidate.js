/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function createAddCandidate(layout, sim) {
    const addCandidateButton = document.createElement('button')

    addCandidateButton.innerText = 'Add Candidate'

    addCandidateButton.onclick = () => {
        sim.addCandidatePressed()
    }

    const div = document.createElement('div')
    div.appendChild(addCandidateButton)
    layout.newDiv('addCandidate', div)
}
