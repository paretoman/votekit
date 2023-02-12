import makeRankingIntervals1D from './makeRankingIntervals1D.js'

export default function makeCanBordersRanking(canGeoms, voterGeoms, dimensions) {
    const someGaussian2D = voterGeoms.some((v) => v.densityProfile === 'gaussian') && dimensions === 2

    if (someGaussian2D || dimensions === 2) {
        const canBorders = {}
        return canBorders
    }
    const canBorders = { rankingIntervals1D: makeRankingIntervals1D(canGeoms) }
    return canBorders
}
