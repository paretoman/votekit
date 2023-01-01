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
export default function GeoMaps(voterGeo, candidateList, screen, electionOptions) {
    const self = this

    const { districtMaker } = voterGeo

    self.districtDraw = new DistrictDraw(screen, districtMaker)

    // Code that handles making images of geographic noise.
    self.noiseImage = new NoiseImage(voterGeo.nx, voterGeo.ny, screen)

    // Update //

    self.update = (geoElectionResults) => {
        const gc = geoColors(geoElectionResults, candidateList, electionOptions)
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
}
