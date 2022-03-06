/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function CreateAddCandidate(layout, sim) {
    const self = this

    const addCandidateButton = document.createElement('button')

    addCandidateButton.innerText = 'Add Candidate'

    addCandidateButton.onclick = () => {
        sim.addCandidatePressed()
    }

    const div = document.createElement('div')
    div.appendChild(addCandidateButton)
    layout.newDiv('addCandidate', div)

    self.show = () => {
        addCandidateButton.hidden = false
    }
    self.hide = () => {
        addCandidateButton.hidden = true
    }
}
