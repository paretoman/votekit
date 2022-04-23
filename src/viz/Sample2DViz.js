/** @module */

/**
 * Show Voters
 * @param {SampleVoters} sampleVoters
 * @param {screen} screen - draw to the screen
 * @constructor
 */
export default function Sample2DViz(sampleVoters, screen) {
    const self = this

    // Graphics component
    self.render = function () {
        const { ctx } = screen
        const voterGroups = sampleVoters.getVoterGroups()
        voterGroups.forEach((voterGroup) => {
            // circle
            ctx.beginPath()
            // ctx.fillStyle = "#eee"
            const { x, y, shape2 } = voterGroup
            ctx.arc(x, y, shape2.w * 0.5, 0, 2 * Math.PI)
            // ctx.fill()
            ctx.stroke()
        })
    }
}
