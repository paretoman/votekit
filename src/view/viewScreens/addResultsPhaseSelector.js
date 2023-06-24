import { range } from '../../utilities/jsHelpers.js'
import ButtonGroup from '../menu/ButtonGroup.js'
import { buttonWidth } from '../menu/MenuItem.js'

export default function addResultsPhaseSelector(simOptions, pub, layout, changes, electionOptionsMan) {
    // make two selectors, one for each sequence with a primary
    const choose1 = addResultsPhaseSelectorForSequence('closedPrimary', simOptions, pub, layout, electionOptionsMan)
    const chooseParty = addResultsPartySelector('closedPrimary', simOptions, pub, layout, electionOptionsMan)
    const choose2 = addResultsPhaseSelectorForSequence('nonpartisanOpenPrimary', simOptions, pub, layout, electionOptionsMan)

    const div = document.createElement('div')
    div.appendChild(choose1.dom)
    div.appendChild(chooseParty.dom)
    div.appendChild(choose2.dom)
    layout.newElement('resultsPhaseSelector', div)
}

function addResultsPhaseSelectorForSequence(sequenceName, simOptions, pub, layout, electionOptionsMan) {
    const choose = new ButtonGroup({
        label: 'Phase of Results to Display:',
        width: buttonWidth(3),
        data: [
            { name: 'Primary', value: sequenceName },
            // shortcut: using sequenceName, which happens to be the primary phase name
            { name: 'General', value: 'general' },
        ],
        onChoose: (data) => {
            simOptions.setResultsPhase(sequenceName, data.value)
        },
    })
    pub.attach({ update })
    function update() {
        const show = sequenceName === electionOptionsMan.getOptions().sequenceOptions.sequenceName
        if (show) {
            choose.dom.hidden = false
        } else {
            choose.dom.hidden = true
        }
    }
    choose.highlight('value', simOptions.resultsPhaseBySeq[sequenceName])
    return choose
}

function addResultsPartySelector(sequenceName, simOptions, pub, layout, electionOptionsMan) {
    const choose = new ButtonGroup({
        label: 'Party of Results to Display:',
        width: buttonWidth(10),
        data: range(10).map((i) => ({ name: i, value: i })),
        onChoose: (data) => {
            simOptions.setResultsParty(sequenceName, data.value)
        },
    })
    pub.attach({ update })
    function update() {
        const optSeqName = electionOptionsMan.getOptions().sequenceOptions.sequenceName
        const show1 = sequenceName === optSeqName
        const show2 = simOptions.resultsPhaseBySeq[optSeqName] !== 'general'
        const show = show1 && show2
        if (show) {
            choose.dom.hidden = false
        } else {
            choose.dom.hidden = true
        }
    }
    choose.highlight('value', simOptions.resultsPhaseIndexBySeq[sequenceName])
    return choose
}
