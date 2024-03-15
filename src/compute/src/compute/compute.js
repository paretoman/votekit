import socialChoiceMethods, { socialChoiceMethodMetadataByFunctionName } from '@paretoman/votekit-social-choice-methods'
import voteCasters from '@paretoman/votekit-vote-casters'
import electionSequence from '@paretoman/votekit-election-sequence'
import makeGeography, { makeTracts, updateDistricts, updateCensus, updateVotersByTract, updateVotersByDistrict } from '../geography/makeGeography.js'
import makeCandidateDistributionCDF from '../sampleElection/makeCandidateDistributionCDF.js'
import sampleElection from '../sampleElection/sampleElection.js'

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
