import sampleCanDnGeom1D from './sampleCanDnGeom1D.js'
import sampleCanDnGeom2D from './sampleCanDnGeom2D.js'

/**
 * Pick a point in the candidate distribution geometry.
 * @param {Object} canDnGeom - candidate distribution geometry
 * @param {number} dimensions
 * @returns {Object} canGeom
 */
export default function sampleCanDnGeom(canDnGeom, dimensions, rng) {
    if (dimensions === 1) {
        return sampleCanDnGeom1D(canDnGeom, rng)
    }
    return sampleCanDnGeom2D(canDnGeom, rng)
}
