/** @module */

import DistrictDraw from './DistrictDraw.js'
import districtColors from './DistrictColors.js'
import NoiseImage from './NoiseImage.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictMaps(candidateList, screen, electionOptions, changes) {
    const self = this

    // Update //

    self.update = (districtElectionResults) => {
        const { voterDistricts } = districtElectionResults.geometry

        // todo: make this only run when we have new districts
        if (changes.check(['useDistricts']) && self.districtDraw === undefined) {
            const { districtMaker } = voterDistricts
            self.districtDraw = new DistrictDraw(screen, districtMaker)
            // Code that handles making images of geographic noise.
            self.noiseImage = new NoiseImage(voterDistricts.nx, voterDistricts.ny, screen)
        }

        const gc = districtColors(districtElectionResults, candidateList, electionOptions)
        const { colorByTract, colorOfVoteByDistrict, colorOfWinsByDistrict } = gc
        self.colorOfVoteByDistrict = colorOfVoteByDistrict
        self.winnerColors = colorOfWinsByDistrict
        self.noiseImage.loadColors(colorByTract)
    }

    // Display //

    const districtMapWidth = 100
    const districtMapHeight = 100

    // screen.setMapsHeight((1 / 3) * screen.height)
    /** Render all maps and  */
    self.render = () => {
        self.renderTractVotes()
        self.renderDistrictWins()
        self.renderDistrictVotes()
    }
    // Render census tract votes.
    self.renderTractVotes = () => {
        self.noiseImage.render(districtMapWidth, districtMapHeight)
        self.districtDraw.renderVoronoi(districtMapWidth, districtMapHeight)
    }
    // Render district wins.
    self.renderDistrictWins = () => {
        const { renderVoronoiColors } = self.districtDraw
        renderVoronoiColors(200, 0, districtMapWidth, districtMapHeight, self.winnerColors)
    }
    // render district votes.
    self.renderDistrictVotes = () => {
        const { renderVoronoiColors } = self.districtDraw
        renderVoronoiColors(100, 0, districtMapWidth, districtMapHeight, self.colorOfVoteByDistrict)
    }
}
