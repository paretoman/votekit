import makeGeography, { makeTracts, updateCensus, updateDistricts, updateVoters } from '../geography/makeGeography.js'
import makeCandidateDistributionCDF from '../sampler/makeCandidateDistributionCDF.js'
import sampleElection from '../sampler/sampleElection.js'
import socialChoiceMethods, { socialChoiceMethodMetadataByFunctionName } from '../socialChoiceMethods/socialChoiceMethods.js'
import getCanBorders from '../voteCasters/voteCasters/getCanBorders.js'
import voteCasters from '../voteCasters/voteCasters/voteCasters.js'
import election from './election.js'

const geography = {
    makeGeography,
    makeTracts,
    updateCensus,
    updateDistricts,
    updateVoters,
}
const voting = {
    getCanBorders,
    voteCasters,
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
    voting,
    socialChoice,
    election,
    sampling,
}

export default electionIndex
