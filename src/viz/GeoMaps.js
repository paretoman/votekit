/** @module */

import DistrictDraw from './DistrictDraw.js'
import geoColors from './geoColors.js'
import NoiseImage from './NoiseImage.js'

/**
 * Show votes
 * @param {VoterGeo} voterGeo
 * @param {Screen} screen
 * @constructor
 */
export default function GeoMaps(voterGeo, candidateViewList, screen, sim) {
    const self = this

    const { districtMaker } = voterGeo

    self.districtDraw = new DistrictDraw(screen, districtMaker)

    // Code that handles making images of geographic noise.
    self.noiseImage = new NoiseImage(voterGeo.nx, voterGeo.ny, screen)

    // Update //

    self.update = (geoElectionResults) => {
        const gc = geoColors(geoElectionResults, candidateViewList, sim)
        const { colorByTract, colorOfVoteByDistrict, colorOfWinsByDistrict } = gc
        self.colorOfVoteByDistrict = colorOfVoteByDistrict
        self.winnerColors = colorOfWinsByDistrict
        self.noiseImage.loadColors(colorByTract)
    }

    // Display //

    const geoMapWidth = 100
    const geoMapHeight = 100

    // screen.setMapsHeight((1 / 3) * screen.height)
    /** Render all maps and  */
    self.render = () => {
        self.renderPolicyNoise()
        self.renderTractVotes()
        self.renderDistrictWins()
        self.renderDistrictVotes()
    }
    // Render census tract votes.
    self.renderTractVotes = () => {
        self.noiseImage.render(geoMapWidth, geoMapHeight)
        self.districtDraw.renderVoronoi(geoMapWidth, geoMapHeight)
    }
    // Render district wins.
    self.renderDistrictWins = () => {
        const { renderVoronoiColors } = self.districtDraw
        renderVoronoiColors(200, 0, geoMapWidth, geoMapHeight, self.winnerColors)
    }
    // render district votes.
    self.renderDistrictVotes = () => {
        const { renderVoronoiColors } = self.districtDraw
        renderVoronoiColors(100, 0, geoMapWidth, geoMapHeight, self.colorOfVoteByDistrict)
    }

    /** Draw dots to represent the political diversity across census tracts. */
    self.renderPolicyNoise = () => {
        voterGeo.voterGroupsByTract.forEach((row) => {
            row.forEach((cell) => {
                cell.forEach((voterGroup) => {
                    if (sim.election.dimensions === 1) {
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
