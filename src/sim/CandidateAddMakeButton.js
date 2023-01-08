/** @module */

/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Sim} canList
 */
export default function CandidateAddMakeButton(layout, canList) {
    const self = this

    const addCandidateButton = document.createElement('button')

    addCandidateButton.className = 'button2'
    addCandidateButton.innerText = 'Add Candidate'

    addCandidateButton.onclick = () => {
        canList.addCandidatePressed()
    }

    layout.newElement('addCandidate', addCandidateButton)

    self.show = () => {
        addCandidateButton.hidden = false
    }
    self.hide = () => {
        addCandidateButton.hidden = true
    }
}
