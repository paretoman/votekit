import { getCDF } from '../util/mathHelpers.js'

export default function makeCandidateDistributionCDF(canDnGeoms, dimensions) {
    const proportion = (dimensions === 1) ? canDnGeoms.map((cd) => cd.w) : canDnGeoms.map((cd) => cd.w ** 2)
    const canDnCDF = getCDF(proportion)
    return canDnCDF
}
