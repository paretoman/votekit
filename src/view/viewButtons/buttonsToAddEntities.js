import candidateAddMakeButton from './candidateAddMakeButton.js'
import candidateDnAddMakeButton from './candidateDnAddMakeButton.js'
import voterShapeAddMakeButton from './voterShapeAddMakeButton.js'

export default function buttonsToAddEntities(viewMode, entities, layout) {
    const can = candidateAddMakeButton(viewMode, entities.candidateList)
    const candn = candidateDnAddMakeButton(viewMode, entities.candidateDnList)
    const voter = voterShapeAddMakeButton(entities.voterShapeList)

    const addEntities = document.createElement('div')
    addEntities.append(voter)
    addEntities.append(can)
    addEntities.append(candn)

    layout.newElement('addEntities', addEntities)
}
