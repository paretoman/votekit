/** @module */

/**
 * Candidate used for simulation of sampling candidates from a distribution.
 * Just a single point (x,y) is needed.
 * @param {Number} x
 * @param {Number} y
 * @param {Election} election
 */
export default function simpleCandidate(x, y, election) {
    election.newCandidate({ x, y })
}
