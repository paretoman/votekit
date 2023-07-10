/** @module */

import electionPhase from '../polling/electionPhase.js'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionPhaseOptions from './getPhaseOptions.js'
import { range } from '../util/mathHelpers.js'

/**
 * Here we are in the context of a single election.
 * Run a primary election for each party, then a general election.
 */
export default function electionClosedPrimary(geometry, electionOptions) {
    const { numParties } = geometry.parties

    const primaryResults = []
    const partyCansLists = []
    const primaryPhaseOptions = getElectionPhaseOptions('closedPrimary', 'closedPrimary', electionOptions)
    for (let i = 0; i < numParties; i++) {
        const { primaryGeometry, partyCans } = getPrimaryGeometry(geometry, i)
        const { voterGeoms, canPoints } = primaryGeometry
        // todo: think about this
        if (voterGeoms.length === 0) continue
        if (canPoints.length === 0) continue
        const primary = electionPhase(primaryGeometry, primaryPhaseOptions)
        primaryResults.push(primary)
        partyCansLists.push(partyCans)
    }

    const { generalGeometry, primaryWinners } = getGeneralGeometry(geometry, primaryResults, numParties, partyCansLists)
    const generalPhaseOptions = getElectionPhaseOptions('closedPrimary', 'general', electionOptions)
    const general = electionPhase(generalGeometry, generalPhaseOptions)

    const results = combineClosedPrimaryGeneral(primaryResults, general, primaryWinners, geometry, electionOptions, partyCansLists)
    return results
}

/**
 * Get the geometry for a primary election.
 * @param {*} geometry
 * @param {*} partyIndex
 * @returns
 */
function getPrimaryGeometry(geometry, partyIndex) {
    const g0 = getGeometryForPhase('closedPrimary', geometry)
    const primaryGeometry = { ...g0 }

    // voters
    const { voterParties } = g0
    primaryGeometry.voterGeoms = g0.voterGeoms.filter((v, i) => voterParties[i] === partyIndex)
    primaryGeometry.voterStrategyList = g0.voterStrategyList.filter((v, i) => voterParties[i] === partyIndex)
    primaryGeometry.voterParties = g0.voterParties.filter((v, i) => voterParties[i] === partyIndex)

    // candidates
    const { partiesByCan } = g0.parties
    primaryGeometry.canPoints = g0.canPoints.filter((c, i) => partiesByCan[i] === partyIndex)
    const partyCans = range(partiesByCan.length).filter((i) => partiesByCan[i] === partyIndex)

    // cleanup
    primaryGeometry.parties = { ...g0.parties }
    primaryGeometry.parties.numParties = 1
    primaryGeometry.parties.partiesByCan = primaryGeometry.parties.partiesByCan.filter((p, i) => partiesByCan[i] === partyIndex)

    return { primaryGeometry, partyCans }
}

function getGeneralGeometry(geometry, primaryResults, numParties, partyCansLists) {
    const g0 = getGeometryForPhase('general', geometry)
    const generalGeometry = { ...g0 }

    const primaryWinners = []
    for (let i = 0; i < numParties; i++) {
        const partyCans = partyCansLists[i]
        if (partyCans === undefined || partyCans.length === 0) continue
        const primaryResult = primaryResults[i]
        const { allocation } = primaryResult.socialChoiceResults
        for (let j = 0; j < allocation.length; j++) {
            if (allocation[j]) { // todo: consider allocation > 1
                const iWinner = partyCans[j]
                primaryWinners.push(iWinner)
            }
        }
    }

    const canPoints = primaryWinners.map((iWinner) => g0.canPoints[iWinner])
    generalGeometry.canPoints = canPoints

    return { generalGeometry, primaryWinners }
}

function combineClosedPrimaryGeneral(primaryResults, general, primaryWinners, geometry, electionOptions, partyCansLists) {
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
            closedPrimary: primaryResults,
            general,
        },
        indicesByPhase: {
            closedPrimary: partyCansLists,
            general: primaryWinners,
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
