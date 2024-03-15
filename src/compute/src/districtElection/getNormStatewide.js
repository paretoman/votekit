export default function getNormStatewide(votesByTract) {
    const numRows = votesByTract.length
    const numCols = votesByTract[0].length
    const dNorm = 1 / (numRows * numCols)
    return dNorm
}
