/** @module */

import electionPhase from '@paretoman/votekit-election-phase'
import { range } from '@paretoman/votekit-utilities'
import getGeometryForPhase from './getGeometryForPhase.js'
import getElectionOptions from './getElectionOptions.js'

/**
 * Here we are in the context of an election sequence with two phases, a non-partisan primary, and a general.
 * @param {*} geometry
 * @param {*} optionsBag
 * @returns
 */
export default function electionNonpartisanPrimary(geometry, optionsBag) {
    // primary phase
    const primaryGeometry = getGeometryForPhase('nonpartisanOpenPrimary', geometry)

    const allCanLabels = range(geometry.canPoints.length)
    primaryGeometry.canLabels = allCanLabels

    const primaryOptions = getElectionOptions('nonpartisanOpenPrimary', 'nonpartisanOpenPrimary', optionsBag)
    const primary = electionPhase(primaryGeometry, primaryOptions, optionsBag)

    // general phase
    const { generalGeometry, primaryWinners } = getGeneralGeometry(geometry, primary)
    const generalOptions = getElectionOptions('nonpartisanOpenPrimary', 'general', optionsBag)
    const general = electionPhase(generalGeometry, generalOptions, optionsBag)

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
    generalGeometry.canLabels = primaryWinners

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
