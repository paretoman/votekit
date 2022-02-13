export default function Candidates() {
    const self = this
    const candidates = []

    self.newCandidate = function (can) {
        candidates.push(can)
    }

    self.clearCandidates = function () {
        candidates.splice(0, candidates.length)
    }
    self.clear = () => {
        candidates.splice(0, candidates.length)
    }

    self.getCandidates = () => candidates

    self.setCandidateFractions = (fractions) => {
        candidates.forEach((can, index) => {
            const fraction = fractions[index]
            can.setFraction(fraction)
        })
    }
    self.setCandidateWins = (winsByCandidate) => {
        candidates.forEach((can, index) => {
            const win = winsByCandidate[index]
            can.setWins(win)
        })
    }
}
