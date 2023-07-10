import makeGeography, { makeTracts, updateCensus, updateDistricts, updateVoters } from '../geography/makeGeography.js'
import makeCandidateDistributionCDF from '../sampleElection/makeCandidateDistributionCDF.js'
import sampleElection from '../sampleElection/sampleElection.js'
import socialChoiceMethods, { socialChoiceMethodMetadataByFunctionName } from '../socialChoiceMethods/socialChoiceMethods.js'
import voteCasters from '../voteCasters/voteCasters/voteCasters.js'
import election from '../sequence/election.js'

const geography = {
    makeGeography,
    makeTracts,
    updateCensus,
    updateDistricts,
    updateVoters,
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
    election,
    sampling,
}

export default electionIndex
