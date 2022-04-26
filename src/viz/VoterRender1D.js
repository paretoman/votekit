/**
 * Graphics Component for voterShapes in 1D
 * @param {VoterShape} voterShape
 * @param {Screen} screen
 */
export default function VoterRender1D(voterShape, screen) {
    const self = this

    self.render = function () {
        const { ctx } = screen
        const { x, shape1 } = voterShape
        const { w, densityProfile } = shape1
        const h = 100
        const middle = 50

        ctx.save()

        ctx.beginPath()
        doPath()
        ctx.stroke()

        ctx.restore()
        function doPath() {
            if (densityProfile === 'gaussian') {
                gaussianPath()
            } else {
                rectanglePath()
            }
        }

        function gaussianPath() {
            const sigma = w / Math.sqrt(2 * Math.PI) // w = sigma * sqrt(2*pi)
            const amp = h
            const bottom = middle + h * 0.5
            // start bottom left
            ctx.moveTo(0, bottom)
            const pa = []
            for (let i = 0; i <= screen.width; i += 1) {
                const xp = 0.5 * ((i - x) / sigma) ** 2
                const y = bottom - amp * Math.exp(-xp)
                pa.push(y)
                ctx.lineTo(i, y)
            }
            // end bottom right
            ctx.lineTo(screen.width, bottom)
            ctx.lineTo(0, bottom)
            // ctx.closePath()
        }
        function rectanglePath() {
            ctx.rect(x - w * 0.5, middle - h * 0.5, w, h)
        }
    }

    self.renderAt = () => { self.render() }
}
