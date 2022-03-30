/** @module */

/**
 * Simulate winners from many sampled elections.
 * Candidates are sampled from a distribution.
 * Winners are drawn as points.
 * The simulation is dynamic. More simulations are performed at each frame.
 * @param {Screen} screen
 * @param {Menu} menu
 * @param {Election} election
 * @constructor
 */
export default function SampleElections(screen, menu, election) {
    const self = this

    self.points = []
    self.newPoints = []

    self.startSim = function () {
        self.points = []
        clearBuffer()
    }

    self.addSim = function (sampleVoters, sampleCandidates) {
        // add more points

        if (sampleVoters.getVoterGroups().length === 0) return 1
        if (sampleCandidates.getCandidateDistributions().length === 0) return 1

        if (self.points.length > 5000) return 1
        // this limit right now is about graphics rendering.
        // todo: render to a buffer

        // number of sample elections
        const ns = 20

        const voterGroups = sampleVoters.getVoterGroups()

        for (let i = 0; i < ns; i++) {
            // choose a number of candidates
            let nk
            if (election.method.checkElectionType() === 'singleWinner') {
                nk = 5
            } else if (election.method.checkElectionType() === 'allocation') {
                nk = 10
            }
            const canList = []
            for (let k = 0; k < nk; k++) {
                // sample a point from the distribution of candidates
                const point = sampleCandidates.sampler.samplePoint()

                // make a candidate
                canList.push({ p2: point })
            }

            // find winner position
            const results = election.runElection(voterGroups, canList)

            if (election.method.checkElectionType() === 'singleWinner') {
                const { winner } = results

                // record point
                const winPoint = winner.p2
                self.points.push(winPoint)
                self.newPoints.push(winPoint)
            } else {
                const { allocation } = results

                const jitterSize = 10
                canList.forEach(
                    (can, k) => {
                        const numPoints = allocation[k]
                        for (let m = 0; m < numPoints; m++) {
                            let winPoint
                            if (m === 0) {
                                // record point
                                winPoint = can.p2
                            } else {
                                // add jitter
                                winPoint = {
                                    x: can.p2.x + (Math.random() - 0.5) * jitterSize,
                                    y: can.p2.y + (Math.random() - 0.5) * jitterSize,
                                }
                            }
                            // record point
                            self.points.push(winPoint)
                            self.newPoints.push(winPoint)
                        }
                    },
                )
            }
        }
        renderToBuffer()
        return 0
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
