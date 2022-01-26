import CandidateDistributionSampler from "./CandidateDistributionSampler.js"
import VoteManager from './VoteManager.js'
import SimpleCandidate from "./SimpleCandidate.js"

// Simulate winners from many elections
// Candidates are sampled from a distribution
// Winners are drawn as points
// The simulation is dynamic. More simulations are performed at each frame.

export default function SimVoteManager(screen) {
    let self = this

    self.points = []
    self.newPoints = []

    let votem = new VoteManager()

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

        clearBuffer()
    }

    self.addSim = function() {
        // add more points 

        if (self.points.length > 5000) return
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
            
            // find winner position
            const results = votem.runElection()
            const winner = results.winner

            // record point
            let winPoint = { x:winner.square.x , y:winner.square.y }
            self.points.push(winPoint)
            self.newPoints.push(winPoint)
            votem.clearCandidates()
        }
        renderToBuffer()
    }


    // buffer canvas
    var canvas2 = document.createElement('canvas')
    canvas2.width = screen.canvas.width
    canvas2.height = screen.canvas.height
    var context2 = canvas2.getContext('2d')
    
    function clearBuffer() {
        context2.clearRect(0,0,canvas2.width,canvas2.height)
    }

    function renderToBuffer() {
        let ctx = context2
        renderPoints(ctx,self.newPoints)
        self.newPoints = []
    }

    self.render = function() {
        if (screen.noBuffers) {
            self.noBufferRender()
        } else {
            self.bufferRender()
        }
    }

    self.bufferRender = function() {
        let ctx = screen.ctx
        ctx.drawImage(canvas2, 0, 0)
    }

    // use this if we want to export to an SVG
    self.noBufferRender = function() {
        let ctx = screen.ctx
        renderPoints(ctx,self.points)
    }

    function renderPoints(ctx,points) {
        ctx.fillStyle = "grey"
        const n = points.length
        for (let i = 0; i < n; i++) {
            const p = points[i]
            // dot
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3, 0, 2*3.14159)
            ctx.fill()
        }
    }

}
