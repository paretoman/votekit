import makeGeography, { makeTracts, updateCensus, updateDistricts, updateVoters } from '../geography/makeGeography.js'
import CandidateDistributionSampler1D from '../sampler/CandidateDistributionSampler1D.js'
import CandidateDistributionSampler2D from '../sampler/CandidateDistributionSampler2D.js'
import ElectionSampler from '../sampler/ElectionSampler.js'
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
const sampler = {
    CandidateDistributionSampler1D,
    CandidateDistributionSampler2D,
    ElectionSampler,
}
const electionIndex = {
    geography,
    voting,
    socialChoice,
    election,
    sampler,
}

export default electionIndex
