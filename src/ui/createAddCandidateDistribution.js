/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function CreateAddCandidateDistribution(layout, sim) {
    const self = this
    const addCandidateDistributionButton = document.createElement('button')

    addCandidateDistributionButton.innerText = 'Add CandidateDistribution'

    addCandidateDistributionButton.onclick = () => {
        sim.addCandidateDistributionPressed()
    }

    const div = document.createElement('div')
    div.appendChild(addCandidateDistributionButton)
    layout.newDiv('addCandidateDistribution', div)

    self.show = () => {
        addCandidateDistributionButton.hidden = false
    }
    self.hide = () => {
        addCandidateDistributionButton.hidden = true
    }
}
