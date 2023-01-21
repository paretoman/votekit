/** @module */

import castPlurality from './castPlurality.js'

/**
 * Vote for one.
 * Voters cast votes for candidates.
 * There is also a separate graphical representation in Voronoi2D.js.
 * @param {Objects[]} canGeoms - For 2D, an array of objects: {x,y,party}.
 * For 1D, an array of objects: {x,party}.
 * @param {Objects[]} voterGeoms - For 2D, an array of objects: {x,y,w}.
 * For 1D, an array of objects: {x,w,densityProfile}.
 * @returns votes, an object
 */
export default function castOLPRA(geometry) {
    const votes = castPlurality(geometry)

    return votes
}
