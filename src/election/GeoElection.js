/** @module */

import colorBlend, { toRGBA } from './colorBlend.js'
import GeoVoters from './GeoVoters.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 * @param {Menu} menu
 * @param {Election} election
 */
export default function GeoElection(screen, menu, election) {
    const self = this

    self.geoVoters = new GeoVoters(screen)

    self.newVoterBasis = function (voterBasis) {
        self.geoVoters.newVoterBasis(voterBasis)
    }

    self.newCandidate = function (can) {
        election.newCandidate(can)
    }

    self.clear = () => {
        self.geoVoters.clear()
        election.clear()
    }
    self.update = () => {
        self.updateDistricts()
        self.updateVotes()
    }
    self.updateDistricts = () => {
        self.geoVoters.updateDistricts()
    }
    self.updateVotes = () => {
        self.geoVoters.updateVotes()
        self.updateStatewideTallies()
        self.updateNoiseImage()
        self.runDistrictElections()
        self.updateWinColors()
        self.updateColorBlendGeoMap()
        self.updateWins()
    }

    /** Show tallies over all the districts
     * Find statewide support for candidates (parties).
     */
    self.updateStatewideTallies = function () {
        const candidates = election.getCandidates()
        const { allVoterGroups } = self.geoVoters
        const electionResults = election.runElection(candidates, allVoterGroups)
        const { tallyFractions } = electionResults.votes
        election.setCandidateFractions(tallyFractions)
    }

    /** Visualize voter demographics according to votes for candidates within a voterGroup.
     * Hold mini-elections within a voterGroup.
     */
    self.updateNoiseImage = function () {
        // visualize simplex noise
        // self.geoVoters.noiseImage.load(sn)

        // visualize noise with election data
        const candidates = election.getCandidates()
        const { voterGroupsByTract } = self.geoVoters

        const resultsByTract = voterGroupsByTract.map(
            (row) => row.map(
                (voterGroups) => election.runElection(candidates, voterGroups),
            ),
        )

        // get color
        const colorSet = candidates.map((can) => can.square.color)
        const allColors = resultsByTract.map(
            (row) => row.map(
                (results) => {
                    const { tallyFractions } = results.votes
                    const color = toRGBA(colorBlend(tallyFractions, colorSet))
                    return color
                },
            ),
        )

        self.geoVoters.noiseImage.loadColors(allColors)
    }

    /** Run separate elections in each district. */
    self.runDistrictElections = () => {
        // Loop through districts.
        // Find who won.

        const candidates = election.getCandidates()
        const { voterGroupsByDistrict } = self.geoVoters

        self.resultsByDistrict = voterGroupsByDistrict.map(
            (voterGroups) => election.runElection(candidates, voterGroups),
        )
    }
    self.updateWinColors = () => {
        // calculate color for win map
        if (election.method.checkElectionType() === 'singleWinner') {
            self.winnerColors = self.resultsByDistrict.map((results) => results.winner.square.color)
        }
    }

    // Show wins across all districts for each candidate
    self.updateWins = function () {
        // make a histogram
        const candidates = election.getCandidates()
        const numCandidates = candidates.length
        const histogram = Array(numCandidates).fill(0)
        self.iWinners = self.resultsByDistrict.map((results) => results.iWinner)
        self.iWinners.forEach((iWinner) => {
            histogram[iWinner] += 1
        })
        election.setCandidateWins(histogram)
    }

    /** Update color for each district, based on votes for each candidate.
     * Blend candidate colors in proportion to their votes.
     */
    self.updateColorBlendGeoMap = () => {
        self.blendColors = self.resultsByDistrict.map((results) => {
            const { tallyFractions } = results.votes
            const candidates = election.getCandidates()
            const colorSet = candidates.map((can) => can.square.color)
            const color = colorBlend(tallyFractions, colorSet)
            return color
        })
    }

    // Display //

    const geoMapWidth = 150
    const geoMapHeight = 150

    /** Render all maps and  */
    self.render = () => {
        renderPolicyNoise()
        self.renderTractVotes()
        self.renderDistrictWins()
        self.renderDistrictVotes()
    }
    // Render census tract votes.
    self.renderTractVotes = () => {
        self.geoVoters.noiseImage.render(geoMapWidth, geoMapHeight)
        self.geoVoters.districtMaker.renderVoronoi(geoMapWidth, geoMapHeight)
    }
    // Render district wins.
    self.renderDistrictWins = () => {
        const { renderVoronoiColors } = self.geoVoters.districtMaker
        renderVoronoiColors(450, 0, geoMapWidth, geoMapHeight, self.winnerColors)
    }
    // render district votes.
    self.renderDistrictVotes = () => {
        const { renderVoronoiColors } = self.geoVoters.districtMaker
        renderVoronoiColors(225, 0, geoMapWidth, geoMapHeight, self.blendColors)
    }

    /** Draw dots to represent the political diversity across census tracts. */
    function renderPolicyNoise() {
        const { voterGroupsByTract } = self.geoVoters
        voterGroupsByTract.forEach((g) => {
            smallCircle(g.x, g.y)
        })
    }

    /** Draw a small dot */
    function smallCircle(x, y) {
        const { ctx } = screen
        ctx.beginPath()
        ctx.fillStyle = '#555'
        ctx.arc(x, y, 1, 0, 2 * Math.PI)
        ctx.fill()
    }
}
