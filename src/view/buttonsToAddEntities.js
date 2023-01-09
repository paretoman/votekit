import CandidateAddMakeButton from './CandidateAddMakeButton.js'
import CandidateDnAddMakeButton from './CandidateDnAddMakeButton.js'
import VoterShapeAddMakeButton from './VoterShapeAddMakeButton.js'

export default function buttonsToAddEntities(viewSM, entities, layout) {
    CandidateAddMakeButton(viewSM, layout, entities.candidateList)
    CandidateDnAddMakeButton(viewSM, layout, entities.candidateDnList)
    VoterShapeAddMakeButton(layout, entities.voterShapeList)
}
