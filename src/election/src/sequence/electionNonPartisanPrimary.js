/** @module */

import electionPhase from '../polling/electionPhase.js'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionPhaseOptions from './getPhaseOptions.js'

/**
 * Here we are in the context of a single election with two phases, a non-partisan primary, and a general.
 */
export default function electionNonpartisanPrimary(geometry, optionsBag) {
    // primary phase
    const primaryGeometry = getGeometryForPhase('nonpartisanOpenPrimary', geometry)

    const primaryOptions = getElectionPhaseOptions('nonpartisanOpenPrimary', 'nonpartisanOpenPrimary', optionsBag)
    const primary = electionPhase(primaryGeometry, primaryOptions)

    // general phase
    const { generalGeometry, primaryWinners } = getGeneralGeometry(geometry, primary)
    const generalOptions = getElectionPhaseOptions('nonpartisanOpenPrimary', 'general', optionsBag)
    const general = electionPhase(generalGeometry, generalOptions)

    // combine primary and general results
    const results = combinePrimaryGeneral(primary, general, primaryWinners, geometry, optionsBag)

    return results
}
/** Get the winners of the primary to be candidates in the general. */
function getGeneralGeometry(geometry, primary) {
    const g0 = getGeometryForPhase('general', geometry)
    const generalGeometry = { ...g0 }

    const { allocation } = primary.socialChoiceResults
    const primaryWinners = getWinnerList(allocation)
    generalGeometry.canPoints = primaryWinners.map((iWinner) => g0.canPoints[iWinner])
    generalGeometry.canLabels = primaryWinners.map((iWinner) => g0.canLabels[iWinner])

    generalGeometry.parties = { ...g0.parties }
    generalGeometry.parties.partiesByCan = primaryWinners.map((iWinner) => g0.parties.partiesByCan[iWinner])

    return { generalGeometry, primaryWinners }
}

function combinePrimaryGeneral(primary, general, primaryWinners, geometry, optionsBag) {
    const generalAllocation = general.socialChoiceResults.allocation
    const generalWinnerList = getWinnerList(generalAllocation)
    const iWinners = generalWinnerList.map((i) => primaryWinners[i])

    const numCans = geometry.canPoints.length
    const allocation = Array(numCans).fill(0)
    iWinners.forEach((iWinner) => {
        allocation[iWinner] = 1
    })

    const results = {
        phases: {
            nonpartisanOpenPrimary: primary,
            general,
        },
        phaseNames: [
            'nonpartisanOpenPrimary',
            'general',
        ],
        geometry,
        optionsBag,
        socialChoiceResults: {
            allocation,
        },
    }

    return results
}

function getWinnerList(allocation) {
    const iWinners = []
    allocation.forEach((winner, i) => {
        if (winner) {
            iWinners.push(i)
        }
    })
    return iWinners
}
