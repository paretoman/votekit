/** @module */

import castPluralityTestVote from './castPluralityTestVote.js'

/**
 * Vote for one.
 * Voter casts vote for candidate.
 * There is also a separate graphical representation in Voronoi2D.js.
 * @param {Objects[]} canGeoms - For 2D, an object: {x,y}.
 * For 1D, an object: {x}.
 * @param {Objects[]} voterGeom - For 2D, an object: {x,y,w}.
 * For 1D, an object: {x,w,densityProfile}.
 * @returns vote, an object
 */
export default function castOLPRATestVote({
    canGeoms, voterGeom, dimensions, partiesByCan,
}) {
    const vote = castPluralityTestVote({ canGeoms, voterGeom, dimensions })

    // TODO: consider more than one party for a candidate.
    vote.partiesByCan = partiesByCan.map((c) => c[0])
    vote.numParties = countUnique(vote.partiesByCan)

    return vote
}

function countUnique(iterable) {
    return new Set(iterable).size
}
