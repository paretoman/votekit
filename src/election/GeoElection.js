/** @module */

import colorBlend, { toRGBA } from './colorBlend.js'

/**
 * An election with many districts.
 * Voters are from many groups.
 * Voter groups are centered around a point.
 * The point is moved by simplex noise to create distinct districts.
 * All the voter groups share the same voter basis.
 * @param {Menu} menu
 * @param {Election} election
 * @constructor
 */
export default function GeoElection(screen, menu, election) {
    const self = this

    self.updateVotes = (geoVoters, candidates) => {
        self.updateStatewideTallies(geoVoters, candidates)
        self.updateNoiseImage(geoVoters, candidates)
        self.runDistrictElections(geoVoters, candidates)
        self.updateWinColors(candidates)
        self.updateColorBlendGeoMap(candidates)
        self.updateWins(candidates)
    }

    /** Show tallies over all the districts
     * Find statewide support for candidates (parties).
     */
    self.updateStatewideTallies = function (geoVoters, candidates) {
        const canList = candidates.getCandidates()
        const { allVoterGroups } = geoVoters
        const electionResults = election.runElection(allVoterGroups, canList)
        const { tallyFractions } = electionResults.votes
        candidates.setCandidateFractions(tallyFractions)
    }

    /** Visualize voter demographics according to votes for candidates within a voterGroup.
     * Hold mini-elections within a voterGroup.
     */
    self.updateNoiseImage = function (geoVoters, candidates) {
        // visualize simplex noise
        // self.geoVoters.noiseImage.load(sn)

        // visualize noise with election data
        const canList = candidates.getCandidates()
        const { voterGroupsByTract } = geoVoters

        const resultsByTract = voterGroupsByTract.map(
            (row) => row.map(
                (voterGroups) => election.runElection(voterGroups, canList),
            ),
        )

        // get color
        const colorSet = canList.map((can) => can.square.color)
        const allColors = resultsByTract.map(
            (row) => row.map(
                (results) => {
                    const { tallyFractions } = results.votes
                    const color = toRGBA(colorBlend(tallyFractions, colorSet))
                    return color
                },
            ),
        )

        geoVoters.noiseImage.loadColors(allColors)
    }

    /** Run separate elections in each district. */
    self.runDistrictElections = (geoVoters, candidates) => {
        // Loop through districts.
        // Find who won.

        const canList = candidates.getCandidates()
        const { voterGroupsByDistrict } = geoVoters

        self.resultsByDistrict = voterGroupsByDistrict.map(
            (voterGroups) => election.runElection(voterGroups, canList),
        )
    }
    self.updateWinColors = (candidates) => {
        // calculate color for win map
        if (election.method.checkElectionType() === 'singleWinner') {
            self.winnerColors = self.resultsByDistrict.map((results) => results.winner.square.color)
        } else {
            const canList = candidates.getCandidates()
            const colorSet = canList.map((can) => can.square.color)
            self.winnerColors = self.resultsByDistrict.map(
                (results) => {
                    const { allocation } = results
                    const sum = allocation.reduce((p, c) => p + c)
                    const fractions = allocation.map((x) => x / sum)
                    const color = colorBlend(fractions, colorSet)
                    return color
                },
            )
        }
    }

    // Show wins across all districts for each candidate
    self.updateWins = function (candidates) {
        // make a histogram
        const canList = candidates.getCandidates()
        const numCandidates = canList.length
        const histogram = Array(numCandidates).fill(0)
        if (election.method.checkElectionType() === 'singleWinner') {
            const iWinners = self.resultsByDistrict.map((results) => results.iWinner)
            iWinners.forEach((iWinner) => {
                histogram[iWinner] += 1
            })
        } else {
            self.resultsByDistrict.forEach(
                (results) => {
                    const { allocation } = results
                    for (let i = 0; i < numCandidates; i++) {
                        histogram[i] += allocation[i]
                    }
                },
            )
        }
        candidates.setCandidateWins(histogram)
    }

    /** Update color for each district, based on votes for each candidate.
     * Blend candidate colors in proportion to their votes.
     */
    self.updateColorBlendGeoMap = (candidates) => {
        self.blendColors = self.resultsByDistrict.map((results) => {
            const { tallyFractions } = results.votes
            const canList = candidates.getCandidates()
            const colorSet = canList.map((can) => can.square.color)
            const color = colorBlend(tallyFractions, colorSet)
            return color
        })
    }
}
