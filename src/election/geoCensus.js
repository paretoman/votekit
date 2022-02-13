// import _ from 'https://cdn.skypack.dev/lodash@4.17.21'
import polygonClip from '../../lib/polygonClip.js'
import { range, jcopy } from './jsHelpers.js'
import { polygonArea } from '../../lib/d3-polygon/src/index.js'

// what fraction of each voterGroup lives in each district?
// return an array indexed by district
// each element contains an array of pairs
// the first of the pair is a voterGroup pair of coordinates
// the second of the pair is the fraction of the voterGroup within that district
export default function geoCensus(self) {
    const {
        nd, nx, ny, polygons,
    } = self

    const census = Array(nd).fill().map(() => [])

    for (let gx = 0; gx < nx; gx++) { // x-coordinate of group
        for (let gy = 0; gy < ny; gy++) { // y-coordinate of group
            const subject = makeSquare(gx, gy)
            range(nd).forEach((iDistrict) => {
                const poly = polygons[iDistrict]
                const clip = jcopy(poly).reverse()
                const overlap = polygonClip(clip, subject)

                // store data more sparsely because it is more efficient
                // loop through all districts
                if (overlap !== null) {
                    census[iDistrict].push([gx, gy, polygonArea(overlap)])
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
