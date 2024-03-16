/** @module */

import { range } from '@paretoman/votekit-utilities'
import electionPhase from '@paretoman/votekit-election-phase'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionOptions from './getElectionOptions.js'

/**
 * Here we are in the context of an election sequence.
 * Run a primary election for each party, then a general election.
 * @param {*} geometry
 * @param {*} optionsBag
 * @returns
 */
export default function electionClosedPrimary(geometry, optionsBag) {
    const { numParties } = geometry.parties

    const primaryResults = []
    const partyCansLists = []
    const primaryPhaseOptions = getElectionOptions('closedPrimary', 'closedPrimary', optionsBag)
    for (let i = 0; i < numParties; i++) {
        const { primaryGeometry, partyCans } = getPrimaryGeometry(geometry, i)
        const { voterGeoms, canPoints } = primaryGeometry
        // todo: think about this
        if (voterGeoms.length === 0) continue
        if (canPoints.length === 0) continue
        const primary = electionPhase(primaryGeometry, primaryPhaseOptions, optionsBag)
        primaryResults.push(primary)
        partyCansLists.push(partyCans)
    }

    const { generalGeometry, primaryWinners } = getGeneralGeometry(geometry, primaryResults, numParties, partyCansLists)
    const generalPhaseOptions = getElectionOptions('closedPrimary', 'general', optionsBag)
    const general = electionPhase(generalGeometry, generalPhaseOptions, optionsBag)

    const results = combineClosedPrimaryGeneral(primaryResults, general, primaryWinners, geometry, optionsBag)
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
    primaryGeometry.canLabels = g0.canLabels.filter((c, i) => partiesByCan[i] === partyIndex)
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

    generalGeometry.canPoints = primaryWinners.map((iWinner) => g0.canPoints[iWinner])
    generalGeometry.canLabels = primaryWinners.map((iWinner) => g0.canLabels[iWinner])

    return { generalGeometry, primaryWinners }
}

function combineClosedPrimaryGeneral(primaryResults, general, primaryWinners, geometry, optionsBag) {
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