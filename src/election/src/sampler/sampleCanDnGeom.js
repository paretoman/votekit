import { sampleCanDnGeom1D } from './CandidateDistributionSampler1D.js'
import { sampleCanDnGeom2D } from './CandidateDistributionSampler2D.js'

/**
 * Pick a point in the candidate distribution geometry.
 * @param {Object} canDnGeom - candidate distribution geometry
 * @param {Number} dimensions
 * @returns {Object} canGeom
 */
export default function sampleCanDnGeom(canDnGeom, dimensions) {
    if (dimensions === 1) {
        return sampleCanDnGeom1D(canDnGeom)
    }
    return sampleCanDnGeom2D(canDnGeom)
}
