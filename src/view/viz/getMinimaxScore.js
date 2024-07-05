export default function getMinimaxScore(winFractionPairwise) {
    const nk = winFractionPairwise.length
    const minimaxScore = []
    for (let k = 0; k < nk ; k++) {
        const pairs = winFractionPairwise[k]
        let min = 1
        for (let i = 0; i < nk; i++) {
            if( i === k ) continue
            const p = pairs[i]
            if (p < min) {
                min = p
            }
        }
        minimaxScore.push(min)
    }
    return minimaxScore
}