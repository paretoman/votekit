import CandidateAddMakeButton from '../sim/CandidateAddMakeButton.js'
import CandidateDnAddMakeButton from '../sim/CandidateDnAddMakeButton.js'
import VoterShapeAddMakeButton from '../sim/VoterShapeAddMakeButton.js'

export default function buttonsToAddEntities(viewSM, entities, layout) {
    CandidateAddMakeButton(viewSM, layout, entities.candidateList)
    CandidateDnAddMakeButton(viewSM, layout, entities.candidateDnList)
    VoterShapeAddMakeButton(layout, entities.voterShapeList)
}
