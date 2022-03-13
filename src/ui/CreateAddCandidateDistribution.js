/** @module */

/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function CreateAddCandidateDistribution(layout, sim) {
    const self = this
    const addCandidateDistributionButton = document.createElement('button')

    addCandidateDistributionButton.className = 'button2'
    addCandidateDistributionButton.innerText = 'Add Candidate Distribution'

    addCandidateDistributionButton.onclick = () => {
        sim.addCandidateDistributionPressed()
    }

    layout.newElement('addCandidateDistribution', addCandidateDistributionButton)

    self.show = () => {
        addCandidateDistributionButton.hidden = false
    }
    self.hide = () => {
        addCandidateDistributionButton.hidden = true
    }
}
