
import AreaSummer from '../AreaSummer.js'

// Vote for one

export default function pluralityBallot(candidates,voterGroups) {

    // Voters cast votes for candidates. There is also a separate graphical representation in VoronoiGroup.js
    let summer = new AreaSummer(candidates)

    // get fraction of votes for each candidate so we can summarize results
    let n = candidates.length
    let tally = (new Array(n)).fill(0)
    for (let voterGroup of voterGroups) {
        let area = summer.sumArea(voterGroup)
        tally = tally.map( (value, index) => value + area[index])
    }
    let total = tally.reduce( (p,c) => p+c)
    let tallyFractions = tally.map( x => x / total)
    let votes = {tallyFractions}
    return votes
    
}