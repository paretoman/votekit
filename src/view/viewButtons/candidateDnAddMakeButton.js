/** @module */

/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Commander} commander
 */
export default function CandidateDnAddMakeButton(viewMode, canDnList) {
    const addCandidateDistributionButton = document.createElement('button')

    addCandidateDistributionButton.className = 'button2'
    addCandidateDistributionButton.innerText = 'Add Candidate Group'

    addCandidateDistributionButton.onclick = () => {
        canDnList.addEntityPressed()
    }

    hide()

    viewMode.viewModes.sample.attach({
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

    return addCandidateDistributionButton
}
