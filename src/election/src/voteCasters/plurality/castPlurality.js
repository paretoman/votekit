/** @module */

import castPluralityIntervals1D from './castPluralityIntervals1D.js'
import castPluralityQuadrature2D from './castPluralityQuadrature2D.js'
import castPluralityGrid from './castPluralityGrid.js'
import seedrandom from '../../lib/snowpack/build/snowpack/pkg/seedrandom.js'
import * as typesGeometry from '../../types/typesGeometry.js'
import * as typesCast from '../../types/typesCast.js'
import * as typesVotes from '../../types/typesVotes.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * @param {typesGeometry.geometry} geometry - geometry for casting votes
 * @param {typesCast.castOptions} castOptions - options for how to cast votes.
 * @returns {typesVotes.votes} votes
 */
export default function castPlurality(geometry, castOptions) {
    const { canPoints, voterGeoms, dimensions, parties, strategySeed, voterStrategyList } = geometry
    const { verbosity } = castOptions

    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const someStrategy = voterStrategyList.some(
        (v) => v.strategy.some(
            (a) => (a.actionName !== 'closest' && a.actionWeight !== 0),
        ),
    )

    const castRegions = (dimensions === 1)
        ? castPluralityIntervals1D
        : castPluralityQuadrature2D
    const cast = (someGaussian2D || someStrategy) ? castPluralityGrid : castRegions

    // get fraction of votes for each candidate so we can summarize results
    const n = canPoints.length
    const votesByGeom = []
    const countByCan = (new Array(n)).fill(0)
    let totalVotes = 0
    const strategyRngs = [seedrandom(`green${strategySeed}`), seedrandom(`orange${strategySeed}`)]
    for (let i = 0; i < voterGeoms.length; i++) {
        const voterGeom = voterGeoms[i]
        const voterStrategy = voterStrategyList[i]

        const votesForGeom = cast(voterGeom, geometry, castOptions, strategyRngs, voterStrategy)
        const { countByCan: countByCanForGeom,
            totalVotes: totalVotesForGeom } = votesForGeom

        for (let k = 0; k < n; k++) {
            countByCan[k] += countByCanForGeom[k]
        }
        totalVotes += totalVotesForGeom

        if (verbosity < 2) continue

        votesByGeom[i] = votesForGeom
    }
    const voteFractionsByCan = countByCan.map((x) => x / totalVotes)

    const candidateTallies = { voteFractionsByCan }
    const numCans = canPoints.length
    const votes = { candidateTallies, parties, numCans }
    if (verbosity < 2) return votes

    votes.votesByGeom = votesByGeom
    return votes
}
