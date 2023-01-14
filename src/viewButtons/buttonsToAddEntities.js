import CandidateAddMakeButton from './CandidateAddMakeButton.js'
import CandidateDnAddMakeButton from './CandidateDnAddMakeButton.js'
import VoterShapeAddMakeButton from './VoterShapeAddMakeButton.js'

export default function buttonsToAddEntities(viewState, entities, layout) {
    CandidateAddMakeButton(viewState, layout, entities.candidateList)
    CandidateDnAddMakeButton(viewState, layout, entities.candidateDnList)
    VoterShapeAddMakeButton(layout, entities.voterShapeList)
}
