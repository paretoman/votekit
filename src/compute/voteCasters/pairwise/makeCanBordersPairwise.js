import makePairwiseIntervals1D from './makePairwiseIntervals1D.js'

export default function makeCanBordersPairwise(canPoints, voterGeoms, dimensions) {
    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    if (dimensions === 2 || someGaussian2D) {
        const canBorders = {}
        return canBorders
    }
    const canBorders = { pairwiseIntervals1D: makePairwiseIntervals1D(canPoints) }
    return canBorders
}
