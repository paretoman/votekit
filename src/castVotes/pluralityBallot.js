import AreaSummer from '../AreaSummer.js'

// Vote for one

export default function pluralityBallot(candidates, voterGroups) {
    // Voters cast votes for candidates.
    // There is also a separate graphical representation in VoronoiGroup.js
    const summer = new AreaSummer(candidates)

    // get fraction of votes for each candidate so we can summarize results
    const n = candidates.length
    let tally = (new Array(n)).fill(0)
    voterGroups.forEach((voterGroup) => {
        const area = summer.sumArea(voterGroup)
        tally = tally.map((value, index) => value + area[index])
    })
    const total = tally.reduce((p, c) => p + c)
    const tallyFractions = tally.map((x) => x / total)
    const votes = { tallyFractions }
    return votes
}
