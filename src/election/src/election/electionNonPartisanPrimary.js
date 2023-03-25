/** @module */

import electionPhase from './electionPhase.js'
import getElectionPhaseOptions from './getPhaseOptions.js'

/**
 * Here we are in the context of a single election with two phases, a non-partisan primary, and a general.
 */
export default function electionNonpartisanPrimary(geometry, electionOptions) {
    // primary phase
    const primaryOptions = getElectionPhaseOptions(electionOptions, 'nonpartisanOpenPrimary')
    const primary = electionPhase(geometry, primaryOptions)

    // general phase
    const { generalGeometry, primaryWinners } = getGeneralGeometry(geometry, primary)
    const generalOptions = getElectionPhaseOptions(electionOptions, 'general')
    const general = electionPhase(generalGeometry, generalOptions)

    // combine primary and general results
    const results = combinePrimaryGeneral(primary, general, primaryWinners, geometry, electionOptions)

    return results
}
/** Get the winners of the primary to be candidates in the general. */
function getGeneralGeometry(geometry, primary) {
    const generalGeometry = { ...geometry }

    const { allocation } = primary.socialChoiceResults
    const primaryWinners = getWinnerList(allocation)
    generalGeometry.canPoints = primaryWinners.map((iWinner) => geometry.canPoints[iWinner])

    generalGeometry.parties = { ...geometry.parties }
    generalGeometry.parties.partiesByCan = primaryWinners.map((iWinner) => geometry.parties.partiesByCan[iWinner])

    return { generalGeometry, primaryWinners }
}

function combinePrimaryGeneral(primary, general, primaryWinners, geometry, electionOptions) {
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
            primary,
            general,
        },
        geometry,
        electionOptions,
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
