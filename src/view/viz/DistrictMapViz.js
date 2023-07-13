/** @module */

import DistrictDraw from './DistrictDraw.js'
import districtColors from './DistrictColors.js'
import MapOfTracts from './MapOfTracts.js'

/**
 * Show votes
 * @param {Screen} screen
 * @constructor
 */
export default function DistrictMapViz(candidateList, screen, electionOptionsMan, simOptions, changes) {
    const self = this

    let districtMap
    // Update //

    self.update = (districtElectionResults) => {
        const { geography } = districtElectionResults.geometry
        districtMap = geography.districtMap

        // todo: make this only run when we have new districts
        if (self.districtDraw === undefined || changes.check(['numTracts'])) {
            self.districtDraw = new DistrictDraw(screen)
            // Code that handles making images of geographic noise.
            self.mapOfTracts = new MapOfTracts(geography.nx, geography.ny, screen)
        }

        const optionsBag = electionOptionsMan.getOptions()
        const gc = districtColors(districtElectionResults, candidateList, optionsBag, simOptions)
        const { colorByTract, colorOfVoteByDistrict, colorOfWinsByDistrict } = gc
        self.colorOfVoteByDistrict = colorOfVoteByDistrict
        self.winnerColors = colorOfWinsByDistrict
        self.mapOfTracts.loadColors(colorByTract)
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
        self.mapOfTracts.render(districtMapWidth, districtMapHeight)
        self.districtDraw.renderVoronoi(districtMap, districtMapWidth, districtMapHeight)
    }
    // Render district wins.
    self.renderDistrictWins = () => {
        const { renderVoronoiColors } = self.districtDraw
        renderVoronoiColors(districtMap, 200, 0, districtMapWidth, districtMapHeight, self.winnerColors)
    }
    // render district votes.
    self.renderDistrictVotes = () => {
        const { renderVoronoiColors } = self.districtDraw
        renderVoronoiColors(districtMap, 100, 0, districtMapWidth, districtMapHeight, self.colorOfVoteByDistrict)
    }
}
