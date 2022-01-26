import AreaSummer from './AreaSummer.js'

export default function VoteManager(screen) {
    let self = this

    let voterGroups = []
    let candidates = []

    self.newVoterGroup = function(voterGroup) {
        voterGroups.push(voterGroup)
    }

    self.newCandidate = function(can) {
        candidates.push(can)
    }

    self.clearCandidates = function(can) {
        candidates = []
    }

    self.getCandidates = function() {
        // return candidates.map(can =>  {x:can.x,y:can.y}) // todo: why doesn't this work?
        return candidates
    }

    self.vote = function() {
        const fraction = self.count()
        candidates.forEach( (can,index) => can.fraction = fraction[index])
    }

    self.count = function() {
        // All the election calculations happen here. There is also a separate graphical representation in VoronoiGroup.js
        let summer = new AreaSummer(candidates)

        // get fraction of votes for each candidate so we can summarize results
        let n = candidates.length
        let tally = (new Array(n)).fill(0)
        for (let voterGroup of voterGroups) {
            let area = summer.sumArea(voterGroup)
            tally = tally.map( (value, index) => value + area[index])
        }
        let total = tally.reduce( (p,c) => p+c)
        let fraction = tally.map( x => x / total)
        return fraction
    }

}