/** @module */

/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Sim} sim
 */
export default function CandidateAddMakeButton(layout, sim) {
    const self = this

    const addCandidateButton = document.createElement('button')

    addCandidateButton.className = 'button2'
    addCandidateButton.innerText = 'Add Candidate'

    addCandidateButton.onclick = () => {
        sim.addCandidatePressed()
    }

    layout.newElement('addCandidate', addCandidateButton)

    self.show = () => {
        addCandidateButton.hidden = false
    }
    self.hide = () => {
        addCandidateButton.hidden = true
    }
}
