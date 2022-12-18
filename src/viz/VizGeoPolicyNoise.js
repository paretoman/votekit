export default function VizGeoPolicyNoise(sim, screen) {
    const self = this

    self.render = () => {
        const { dimensions } = sim.election.castVotes.options
        sim.voterGeo.voterGroupsByTract.forEach((row) => {
            row.forEach((cell) => {
                cell.forEach((voterGroup) => {
                    if (dimensions === 1) {
                        const { x } = voterGroup.shape1
                        const { y } = voterGroup.shape2
                        const ym = (y % 100) + 0 // TODO: better visual
                        // const y = Math.random() * 100
                        smallCircle(x, ym)
                    } else {
                        const { x, y } = voterGroup.shape2
                        smallCircle(x, y)
                        // TODO: use .x and .y instead of shape2
                    }
                })
            })
        })
    }

    /** Draw a small dot */

    const canvas = document.createElement('canvas')
    const offCtx = canvas.getContext('2d')
    preDrawCircle()
    function preDrawCircle() {
        canvas.width = 10
        canvas.height = 10
        offCtx.beginPath()
        offCtx.fillStyle = '#555'

        offCtx.arc(5, 5, 1, 0, 2 * Math.PI)
        offCtx.fill()
    }

    function smallCircle(x, y) {
        const { ctx } = screen

        ctx.drawImage(canvas, x - 5, y - 5, 10, 10)
    }
}
