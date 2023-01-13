/** @module */

/**
 * Add button to layout for adding a candidate
 * @param {Layout} layout
 * @param {Sim} canList
 */
export default function CandidateAddMakeButton(viewSM, layout, canList) {
    const addCandidateButton = document.createElement('button')

    addCandidateButton.className = 'button2'
    addCandidateButton.innerText = 'Add Candidate'

    addCandidateButton.onclick = () => {
        canList.addCandidatePressed()
    }

    layout.newElement('addCandidate', addCandidateButton)

    viewSM.views.one.attach({
        enter: show,
        exit: hide,
        update: () => {},
    })

    function show() {
        addCandidateButton.hidden = false
    }
    function hide() {
        addCandidateButton.hidden = true
    }
}
