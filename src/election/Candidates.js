export default function Candidates() {
    const self = this

    const candidates = []
    const candidateIDs = []
    let nextID = 0

    self.newCandidate = function (candidate) {
        const id = nextID
        nextID += 1
        candidates.push(candidate)
        candidateIDs.push(id)
        return id
    }

    self.getCandidates = () => candidates.filter((v) => v.exists)

    self.setCandidateFractions = (fractions) => {
        self.getCandidates().forEach((can, index) => {
            const fraction = fractions[index]
            can.setFraction(fraction)
        })
    }
    self.setCandidateWins = (winsByCandidate) => {
        self.getCandidates().forEach((can, index) => {
            const win = winsByCandidate[index]
            can.setWins(win)
        })
    }
    self.renderForeground = () => {
        self.getCandidates().forEach((can) => can.renderForeground())
    }
}
