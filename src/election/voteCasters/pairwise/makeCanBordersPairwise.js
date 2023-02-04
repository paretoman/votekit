import makeIntervals1D from './makeIntervals1D.js'

export default function makeCanBordersPairwise(geometry) {
    const { canGeoms, voterGeoms, dimensions } = geometry

    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    const canBorders = (dimensions === 2 || someGaussian2D) ? {} : makeIntervals1D(canGeoms)
    return canBorders
}
