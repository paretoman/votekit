import socialChoiceMethods, { socialChoiceMethodMetadataByFunctionName } from '@paretoman/votekit-social-choice-methods'
import voteCasters from '@paretoman/votekit-vote-casters'
import makeGeography, { makeTracts, updateDistricts, updateCensus, updateVotersByTract, updateVotersByDistrict } from '../geography/makeGeography.js'
import makeCandidateDistributionCDF from '../sampleElection/makeCandidateDistributionCDF.js'
import sampleElection from '../sampleElection/sampleElection.js'
import electionSequence from '../electionSequence/electionSequence.js'

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
