/** @module */

import electionPhase from './electionPhase.js'
import getElectionPhaseOptions from './getPhaseOptions.js'
import { range } from './mathHelpers.js'

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
        const primary = electionPhase(primaryGeometry, primaryPhaseOptions)
        primaryResults.push(primary)
        partyCansLists.push(partyCans)
    }

    const { generalGeometry, primaryWinners } = getGeneralGeometry(geometry, primaryResults, numParties, partyCansLists)
    const generalPhaseOptions = getElectionPhaseOptions('closedPrimary', 'general', electionOptions)
    const general = electionPhase(generalGeometry, generalPhaseOptions)

    const results = combineClosedPrimaryGeneral(primaryResults, general, primaryWinners, geometry, electionOptions)
    return results
}

/**
 * Get the geometry for a primary election.
 * @param {*} geometry
 * @param {*} partyIndex
 * @returns
 */
function getPrimaryGeometry(geometry, partyIndex) {
    const primaryGeometry = { ...geometry }

    // voters
    const { voterParties } = geometry
    primaryGeometry.voterGeoms = geometry.voterGeoms.filter((v, i) => voterParties[i] === partyIndex)
    primaryGeometry.voterStrategyList = geometry.voterStrategyList.filter((v, i) => voterParties[i] === partyIndex)
    primaryGeometry.voterParties = geometry.voterParties.filter((v, i) => voterParties[i] === partyIndex)

    // candidates
    const { partiesByCan } = geometry.parties
    primaryGeometry.canPoints = geometry.canPoints.filter((c, i) => partiesByCan[i] === partyIndex)
    const partyCans = range(partiesByCan.length).filter((i) => partiesByCan[i] === partyIndex)

    // cleanup
    primaryGeometry.parties = { ...geometry.parties }
    primaryGeometry.parties.numParties = 1
    primaryGeometry.parties.partiesByCan = primaryGeometry.parties.partiesByCan.filter((p, i) => partiesByCan[i] === partyIndex)

    return { primaryGeometry, partyCans }
}

function getGeneralGeometry(geometry, primaryResults, numParties, partyCansLists) {
    const generalGeometry = { ...geometry }

    const primaryWinners = []
    for (let i = 0; i < numParties; i++) {
        const primaryResult = primaryResults[i]
        const { allocation } = primaryResult.socialChoiceResults
        const partyCans = partyCansLists[i]
        for (let j = 0; j < allocation.length; j++) {
            if (allocation[j]) { // todo: consider allocation > 1
                const iWinner = partyCans[j]
                primaryWinners.push(iWinner)
            }
        }
    }

    const canPoints = primaryWinners.map((iWinner) => geometry.canPoints[iWinner])
    generalGeometry.canPoints = canPoints

    return { generalGeometry, primaryWinners }
}

function combineClosedPrimaryGeneral(primaryResults, general, primaryWinners, geometry, electionOptions) {
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
            primary: primaryResults,
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
