/** @module */

/**
 * VoterGroup used for set of voterGroups on a map.
 * Just a single circle (x,y,r) is needed.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} r - radius of circle of voter positions.
 * @param {Election} election
 */
export default function simpleVoterGroup(x, y, r, election, weight) {
    election.newVoterGroup({
        x, y, r, weight,
    })
}
