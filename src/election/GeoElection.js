/** @module */

import geoNoise from './geoNoise.js'
import NoiseImage from './NoiseImage.js'
import simpleVoterGroup from './simpleVoterGroup.js'
import DistrictMaker from './DistrictMaker.js'
import { range, jcopy } from './jsHelpers.js'

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

    const voterBasisSet = []

    self.newVoterBasis = function (voterBasis) {
        voterBasisSet.push(voterBasis)
    }

    self.newCandidate = function (can) {
        election.newCandidate(can)
    }

    // Districts
    const nd = 10

    // Display
    const geoMapWidth = 200
    const geoMapHeight = 200

    // Simplex Noise Parameters
    let sn = []
    const nx = 20 // noise image width in cells
    const ny = 20 // noise image height in cells
    const noiseWidth = 0.5
    const noiseHeight = 0.5

    // Geographic Noise Parameters - amplitude of noise
    const xAmp = 100
    const yAmp = 100

    /** Generate simplex noise. */
    self.genNoise = () => {
        sn = geoNoise(nx, ny, noiseWidth, noiseHeight)
    }
    self.genNoise()

    self.updateVotes = () => {
        self.updateTallies()
        self.updateGeoWinMap()
        self.updateWins()
    }

    // Show tallies over all the districts
    self.updateTallies = function () {
        // only update the tallies for each candidate so they can be shown

        // new set of voters
        election.clearVoterGroups()

        voterBasisSet.forEach((vb) => {
            sn.forEach((rowNoise) => {
                rowNoise.forEach((cellNoise) => {
                    const [xNoise, yNoise] = cellNoise
                    simpleVoterGroup(vb.x + xNoise * xAmp, vb.y + yNoise * yAmp, vb.r, election)
                })
            })
        })

        // visualize simplex noise
        self.noiseImage.load(sn)

        election.updateTallies()
    }

    self.updateGeoWinMap = () => {
        // Loop through districts.
        // Find who won.
        self.savedVoterGroups = Array(nd).fill()
        self.resultsByDistrict = range(nd).map((iDistrict) => {
            // set voterGroups
            election.clearVoterGroups()
            voterBasisSet.forEach((vb) => {
                const voterGroups = self.census[iDistrict]
                voterGroups.forEach((g) => {
                    const [gx, gy, gf] = g
                    const [xNoise, yNoise] = sn[gx][gy]
                    simpleVoterGroup(vb.x + xNoise * xAmp, vb.y + yNoise * yAmp, vb.r, election, gf)
                })
            })
            self.savedVoterGroups[iDistrict] = jcopy(election.getVoterGroups())

            // run election
            const results = election.runElection()
            return results
        })

        // draw color on win map
        if (election.method.checkElectionType() === 'singleWinner') {
            self.winnerColors = self.resultsByDistrict.map((results) => results.winner.square.color)
            self.iWinners = self.resultsByDistrict.map((results) => results.iWinner)
        }
    }

    // Show wins across all districts for each candidate
    self.updateWins = function () {
        // make a histogram
        const candidates = election.getCandidates()
        const numCandidates = candidates.length
        const histogram = Array(numCandidates).fill(0)
        self.iWinners.forEach((iWinner) => {
            histogram[iWinner] += 1
        })
        election.setCandidateWins(histogram)
    }

    self.updateDistricts = () => {
        self.districtMaker.make(nx, ny, nd)
        // eslint-disable-next-line no-console
        self.census = self.districtMaker.census()
    }

    // show a representation of noise
    self.render = () => {
        renderPolicyNoise()
        self.noiseImage.render(geoMapWidth, geoMapHeight)

        self.districtMaker.renderVoronoi(geoMapWidth, geoMapHeight)
        self.districtMaker.renderVoronoiWinners(geoMapWidth, geoMapHeight, self.winnerColors)
    }

    function renderPolicyNoise() {
        let i = 0
        range(nd).forEach((iDistrict) => {
            self.savedVoterGroups[iDistrict].forEach((g) => {
                voterBasisSet.forEach((b) => {
                    i = (i + 1) % 2 // draw only some centers
                    if (i === 0) {
                        b.renderCenterAt(g.x, g.y)
                        // b.renderAt(g.x, g.y)
                    }
                })
            })
        })
    }

    self.noiseImage = new NoiseImage(nx, ny, screen)

    self.districtMaker = new DistrictMaker(screen)

    // for each district
    // clear old voter groups
    // make a set of voter groups,
    // but these will be different than regular voter groups because we won't be able to drag them.
    // election.newVoterGroup
    // make a set of candidates
}
