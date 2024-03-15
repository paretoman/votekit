import makeVoronoiIntervals1D from './makeVoronoiIntervals1D.js'
import makeVoronoiLines2D from './makeVoronoiLines2D.js'

export default function makeCanBordersPlurality(canPoints, voterGeoms, dimensions) {
    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    if (someGaussian2D) {
        const canBorders = {}
        return canBorders
    }
    if (dimensions === 1) {
        const canBorders = { voronoiIntervals1D: makeVoronoiIntervals1D(canPoints) }
        return canBorders
    }
    const canBorders = { voronoiLines2D: makeVoronoiLines2D(canPoints) }
    return canBorders
}
