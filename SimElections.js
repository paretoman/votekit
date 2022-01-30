import CandidateDistributionSampler from './CandidateDistributionSampler.js'
import Election from './Election.js'
import simpleCandidate from './simpleCandidate.js'

// Simulate winners from many elections
// Candidates are sampled from a distribution
// Winners are drawn as points
// The simulation is dynamic. More simulations are performed at each frame.

export default function SimElections(screen, menu) {
    const self = this

    self.points = []
    self.newPoints = []

    const election = new Election(menu)

    const candidateDistributions = []

    self.newVoterGroup = function (voterGroup) {
        election.newVoterGroup(voterGroup)
    }

    self.newCandidateDistribution = function (canDis) {
        candidateDistributions.push(canDis)
    }

    self.startSim = function () {
        // All the election calculations happen here.

        self.sampler = new CandidateDistributionSampler(candidateDistributions)

        self.points = []

        clearBuffer()
    }

    self.addSim = function () {
        // add more points

        if (self.points.length > 5000) return
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 20

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            let nk
            if (election.checkElectionType() === 'singleWinner') {
                nk = 5
            } else if (election.checkElectionType() === 'allocation') {
                nk = 10
            }
            for (let k = 0; k < nk; k++) {
                // sample a point from the distribution of candidates
                const point = self.sampler.samplePoint()

                // make a candidate... could make simpler
                simpleCandidate(point.x, point.y, election)
            }

            // find winner position
            const results = election.runElection()

            if (election.checkElectionType() === 'singleWinner') {
                const { winner } = results

                // record point
                const winPoint = { x: winner.x, y: winner.y }
                self.points.push(winPoint)
                self.newPoints.push(winPoint)
            } else {
                const { allocation, candidates } = results

                const jitterSize = 100
                candidates.forEach(
                    (can, k) => {
                        const numPoints = allocation[k]
                        for (let m = 0; m < numPoints; m++) {
                            let winPoint
                            if (m === 0) {
                                // record point
                                winPoint = { x: can.x, y: can.y }
                            } else {
                                // add jitter
                                winPoint = {
                                    x: can.x + (Math.random() - 0.5) * jitterSize,
                                    y: can.y + (Math.random() - 0.5) * jitterSize,
                                }
                            }
                            // record point
                            self.points.push(winPoint)
                            self.newPoints.push(winPoint)
                        }
                    },
                )
            }
            election.clearCandidates()
        }
        renderToBuffer()
    }

    // buffer canvas
    const canvas2 = document.createElement('canvas')
    canvas2.width = screen.canvas.width
    canvas2.height = screen.canvas.height
    const context2 = canvas2.getContext('2d')

    function clearBuffer() {
        context2.clearRect(0, 0, canvas2.width, canvas2.height)
    }

    function renderToBuffer() {
        const ctx = context2
        renderPoints(ctx, self.newPoints)
        self.newPoints = []
    }

    self.render = function () {
        if (screen.noBuffers) {
            self.noBufferRender()
        } else {
            self.bufferRender()
        }
    }

    self.bufferRender = function () {
        const { ctx } = screen
        ctx.drawImage(canvas2, 0, 0)
    }

    // use this if we want to export to an SVG
    self.noBufferRender = function () {
        const { ctx } = screen
        renderPoints(ctx, self.points)
    }

    function renderPoints(ctx, points) {
        ctx.fillStyle = 'grey'
        const n = points.length
        for (let i = 0; i < n; i++) {
            const p = points[i]
            // dot
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}
