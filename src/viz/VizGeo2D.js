/** @module */

import NoiseImage from './NoiseImage.js'

/**
 * Show votes
 * @param {VoterGeoList} voterGeoList
 * @param {Screen} screen
 * @constructor
 */
export default function VizGeo2D(voterGeoList, screen) {
    const self = this

    // Code that handles making images of geographic noise.
    self.noiseImage = new NoiseImage(voterGeoList.nx, voterGeoList.ny, screen)

    // Update //

    self.update = (geoElectionResults) => {
        const { colorByTract, colorOfVoteByDistrict, colorOfWinsByDistrict } = geoElectionResults
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
        renderPolicyNoise()
        self.renderTractVotes()
        self.renderDistrictWins()
        self.renderDistrictVotes()
        self.renderVoterBasisSet()
    }
    // Render census tract votes.
    self.renderTractVotes = () => {
        self.noiseImage.render(geoMapWidth, geoMapHeight)
        voterGeoList.districtMaker.renderVoronoi(geoMapWidth, geoMapHeight)
    }
    // Render district wins.
    self.renderDistrictWins = () => {
        const { renderVoronoiColors } = voterGeoList.districtMaker
        renderVoronoiColors(200, 0, geoMapWidth, geoMapHeight, self.winnerColors)
    }
    // render district votes.
    self.renderDistrictVotes = () => {
        const { renderVoronoiColors } = voterGeoList.districtMaker
        renderVoronoiColors(100, 0, geoMapWidth, geoMapHeight, self.colorOfVoteByDistrict)
    }
    self.renderVoterBasisSet = () => {
        const voterSimGroups = voterGeoList.getVoterSims()
        voterSimGroups.forEach((v) => v.render())
    }

    /** Draw dots to represent the political diversity across census tracts. */
    function renderPolicyNoise() {
        voterGeoList.voterGroupsByTract.forEach((row) => {
            row.forEach((cell) => {
                cell.forEach((group) => {
                    smallCircle(group.shape2.x, group.shape2.y)
                    // TODO: use .x and .y instead of shape2
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
