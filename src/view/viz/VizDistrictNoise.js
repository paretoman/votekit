export default function VizDistrictNoise(screen) {
    const self = this

    let districtGeometry
    let dimensions

    self.update = (districtElectionResults) => {
        districtGeometry = districtElectionResults.geometry.districtGeometry
        dimensions = districtElectionResults.geometry.dimensions
    }

    self.render = () => {
        const { ctx } = screen
        const { svgMode } = screen.common
        ctx.save()
        if (dimensions === 1) {
            ctx.globalAlpha = 0.3
            districtGeometry.voterGeomsByTract.forEach((row) => {
                row.forEach((cell) => {
                    cell.forEach((voterGeom) => {
                        const { x } = voterGeom
                        faintLine(ctx, x)
                    })
                })
            })
        } else {
            districtGeometry.voterGeomsByTract.forEach((row) => {
                row.forEach((cell) => {
                    cell.forEach((voterGeom) => {
                        const { x, y } = voterGeom
                        smallCircle(ctx, svgMode, x, y)
                    })
                })
            })
        }
        ctx.restore()
    }

    /** Draw a small dot */

    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const offCtx = canvas.getContext('2d')
    drawCircle(offCtx, 5, 5)

    function drawCircle(ctx, x, y) {
        ctx.beginPath()
        ctx.fillStyle = '#555'

        ctx.arc(x, y, 1, 0, 2 * Math.PI)
        ctx.fill()
    }

    function smallCircle(ctx, svgMode, x, y) {
        if (svgMode) {
            drawCircle(ctx, x, y)
            return
        }
        ctx.drawImage(canvas, x - 5, y - 5, 10, 10)
    }

    function faintLine(ctx, x) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 100)
        ctx.stroke()
    }
}
