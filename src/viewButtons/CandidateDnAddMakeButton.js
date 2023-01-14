/** @module */

/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function CandidateDnAddMakeButton(viewState, layout, canDnList) {
    const addCandidateDistributionButton = document.createElement('button')

    addCandidateDistributionButton.className = 'button2'
    addCandidateDistributionButton.innerText = 'Add Candidate Distribution'

    addCandidateDistributionButton.onclick = () => {
        canDnList.addCandidateDistributionPressed()
    }

    layout.newElement('addCandidateDistribution', addCandidateDistributionButton)

    viewState.viewStates.sample.attach({
        enter: show,
        exit: hide,
        update: () => {},
    })

    function show() {
        addCandidateDistributionButton.hidden = false
    }
    function hide() {
        addCandidateDistributionButton.hidden = true
    }
}
