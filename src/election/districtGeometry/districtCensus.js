/** @module */

// import _ from 'https://cdn.skypack.dev/lodash@4.17.21'
import { polygonArea } from '../../lib/snowpack/build/snowpack/pkg/d3-polygon.js'
import polygonClip from '../../lib/polygonClip.js'
import { range, jcopy } from '../../utilities/jsHelpers.js'

/**
 * What fraction of each tract lives in each district?
 * Return an array indexed by district.
 * Each element contains an array of pairs.
 * The first of the pair is a tract's pair of coordinates.
 * The second of the pair is the fraction of the tract within that district.
 * @param {DistrictMaker} districtMap
 * @returns {Number[][][]} - an array of districts,
 * each with a list of census tract properties [x,y,overlap]
 */
export default function districtCensus(districtMap) {
    const {
        nd, nx, ny, polygons,
    } = districtMap

    const census = Array(nd).fill().map(() => [])

    for (let gx = 0; gx < nx; gx++) { // x-coordinate of tract
        for (let gy = 0; gy < ny; gy++) { // y-coordinate of tract
            const subject = makeSquare(gx, gy)
            range(nd).forEach((iDistrict) => {
                const poly = polygons[iDistrict]
                const clip = jcopy(poly).reverse()
                const overlap = polygonClip(clip, subject)

                // store data more sparsely because it is more efficient
                // loop through all districts
                if (overlap !== null) {
                    const gf = polygonArea(overlap)
                    census[iDistrict].push([gx, gy, gf])
                }
            })
        }
    }

    return census
}

function makeSquare(x, y) {
    // the points are in counterclockwise order
    // assuming a coordinate system where y points down and x points right.
    // top left
    // bottom left
    // bottom right
    // top right
    const subject = [
        [x, y],
        [x, y + 1],
        [x + 1, y + 1],
        [x + 1, y],
    ]
    return subject
}
