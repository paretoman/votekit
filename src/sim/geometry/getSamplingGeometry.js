import { makeCandidateDistributionCDF } from '@paretoman/votekit-utilities'
import getUsePollsByPhase from './getUsePollsByPhase.js'

/**
 * Get samplingGeometry inputs to sampleElection.
 * @param {*} voterShapeList
 * @param {*} candidateDnList
 * @param {*} simOptions
 * @param {*} districts
 * @returns {Object} samplingGeometry is input for sampleElection
 */
export default function getSamplingGeometry(voterShapeList, candidateDnList, simOptions, optionsBag, districts) {
    const { dimensions, seeds } = simOptions
    const { geography } = districts
    const { sequenceOptions } = optionsBag

    const voterGeoms = voterShapeList.getGeoms(dimensions)
    const voterParties = voterShapeList.getParties()
    const voterStrategyListByPhase = voterShapeList.getVoterStrategyListByPhase(sequenceOptions)
    const usePollsByPhase = getUsePollsByPhase(voterStrategyListByPhase)

    const canDnGeoms = candidateDnList.getGeoms(dimensions)
    const parties = candidateDnList.getParties()

    const canDnCDF = makeCandidateDistributionCDF(canDnGeoms, dimensions)

    const samplingSeed = `apple${seeds[0]}`
    const strategySeed = `pumpkin${seeds[0]}` // todo: use seeds[1] for strategySeed

    const samplingGeometry = { voterGeoms, voterParties, canDnGeoms, parties, dimensions, geography, canDnCDF, samplingSeed, strategySeed, voterStrategyListByPhase, usePollsByPhase }
    return samplingGeometry
}
