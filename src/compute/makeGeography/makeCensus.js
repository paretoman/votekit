/** @module */

// import _ from 'https://cdn.skypack.dev/lodash@4.17.21'
import { range, jcopy } from '@paretoman/votekit-utilities'
import { polygonArea } from 'd3-polygon'
import polygonClip from './polygonClip.js'

/**
 * What fraction of each tract lives in each district?
 * Return an array indexed by district.
 * Each element contains an array of pairs.
 * The first of the pair is a tract's pair of coordinates.
 * The second of the pair is the fraction of the tract within that district.
 * @returns {number[][][]} - an array of districts,
 * each with a list of census tract properties [x,y,overlap]
 */
export default function makeCensus(districtMap, nx, ny) {
    const { nd, polygons } = districtMap

    const census = Array(nd).fill().map(() => [])

    const xScale = 1 / nx
    const yScale = 1 / ny
    for (let gx = 0; gx < nx; gx++) { // x-coordinate of tract
        for (let gy = 0; gy < ny; gy++) { // y-coordinate of tract
            const subject = makeSquare(gx * xScale, gy * yScale, xScale, yScale)
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

function makeSquare(x, y, w, h) {
    // the points are in counterclockwise order
    // assuming a coordinate system where y points down and x points right.
    // top left
    // bottom left
    // bottom right
    // top right
    const subject = [
        [x, y],
        [x, y + h],
        [x + w, y + h],
        [x + w, y],
    ]
    return subject
}
