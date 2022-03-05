/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function createAddCandidateDistribution(layout, sim) {
    const addCandidateDistributionButton = document.createElement('button')

    addCandidateDistributionButton.innerText = 'Add CandidateDistribution'

    addCandidateDistributionButton.onclick = () => {
        sim.addCandidateDistributionPressed()
    }

    const div = document.createElement('div')
    div.appendChild(addCandidateDistributionButton)
    layout.newDiv('addCandidateDistribution', div)
}
