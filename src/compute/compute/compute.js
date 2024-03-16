import socialChoiceMethods, { socialChoiceMethodMetadataByFunctionName } from '@paretoman/votekit-social-choice-methods'
import voteCasters from '@paretoman/votekit-vote-casters'
import electionSequence from '@paretoman/votekit-election-sequence'
import makeGeography, { makeTracts, updateDistricts, updateCensus, updateVotersByTract, updateVotersByDistrict } from '@paretoman/votekit-make-geography'
import { makeCandidateDistributionCDF } from '@paretoman/votekit-utilities'
import sampleElection from '@paretoman/votekit-sample-election'

const geography = {
    makeGeography,
    makeTracts,
    updateDistricts,
    updateCensus,
    updateVotersByTract,
    updateVotersByDistrict,
}
const socialChoice = {
    socialChoiceMethods,
    socialChoiceMethodMetadataByFunctionName,
}
const sampling = {
    makeCandidateDistributionCDF,
    sampleElection,
}

const electionIndex = {
    geography,
    voteCasters,
    socialChoice,
    election: electionSequence,
    sampling,
}

export default electionIndex
