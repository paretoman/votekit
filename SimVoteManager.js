import CandidateDistributionSampler from "./CandidateDistributionSampler.js"
import VoteManager from './VoteManager.js'
import SimpleCandidate from "./SimpleCandidate.js"

export default function SimVoteManager(screen) {
    let self = this

    self.points = []

    let votem = new VoteManager(screen)

    let candidateDistributions = []

    self.newVoterGroup = function(voterGroup) {
        votem.newVoterGroup(voterGroup)
    }

    self.newCandidateDistribution = function(canDis) {
        candidateDistributions.push(canDis)
    }
    
    self.startSim = function() {

        // All the election calculations happen here. 
        
        self.sampler = new CandidateDistributionSampler(candidateDistributions)

        self.points = []

    }

    self.addSim = function() {
        // add more points 

        if (self.points.length > 500) return
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 20

        for (let i = 0; i < ns; i++) {
                
            // choose a number of candidates
            const nk = 5
            for (let k = 0; k < nk; k++) {

                // sample a point from the distribution of candidates
                let point = self.sampler.samplePoint()

                // make a candidate... could make simpler
                new SimpleCandidate(point.x,point.y,votem)
                // votem.newCandidate({square:point})
            }
            let candidates = votem.getCandidates()
            
            // find winner position
            let fraction = votem.count()

            const max = Math.max(...fraction);
            const iWinner = fraction.indexOf(max);

            // random winner
            // let iWinner = Math.floor(Math.random()*nk)


            let winner = candidates[iWinner]
            // console.log(winner.square)

            // record point
            self.points.push({ x:winner.square.x , y:winner.square.y })
            votem.clearCandidates()
        }
    }

    self.render = function() {
        let ctx = screen.ctx

        ctx.fillStyle = "grey"

        const n = self.points.length
        for (let i = 0; i < n; i++) {
            const p = self.points[i]

            // dot
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3, 0, 2*3.14159)
            ctx.fill()
        }
    }


}
