export default function randomWinner(votes) {
    // pick a random candidate as the winner
    const nk = votes.tallyFractions.length
    const iWinner = Math.floor(Math.random() * nk)
    const results = { iWinner }
    return results
}
