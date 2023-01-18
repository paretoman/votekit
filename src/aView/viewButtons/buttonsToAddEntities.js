import CandidateAddMakeButton from './CandidateAddMakeButton.js'
import CandidateDnAddMakeButton from './CandidateDnAddMakeButton.js'
import VoterShapeAddMakeButton from './VoterShapeAddMakeButton.js'

export default function buttonsToAddEntities(viewMode, entities, layout) {
    CandidateAddMakeButton(viewMode, layout, entities.candidateList)
    CandidateDnAddMakeButton(viewMode, layout, entities.candidateDnList)
    VoterShapeAddMakeButton(layout, entities.voterShapeList)
}
