/** @module */

import geoNoise from './geoNoise.js'
import NoiseImage from './NoiseImage.js'
import simpleVoterGroup from './simpleVoterGroup.js'
import DistrictMaker from './DistrictMaker.js'

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

    /** Generate simplex noise. */
    self.genNoise = () => {
        sn = geoNoise(nx, ny, noiseWidth, noiseHeight)
    }
    self.genNoise()

    // Temporary function for showing tallies
    // Right now, just one district and just one voterCenter.
    self.updateTallies = function () {
        // only update the tallies for each candidate so they can be shown

        // new set of voters
        election.clearVoterGroups()

        voterBasisSet.forEach((vb) => {
            sn.forEach((a) => {
                a.forEach((n) => {
                    simpleVoterGroup(vb.x + n[0] * 100, vb.y + n[1] * 100, vb.r, election)
                })
            })
        })

        // visualize simplex noise
        self.noiseImage.load(sn)

        election.updateTallies()
    }

    self.updateDistricts = () => {
        self.districtMaker.make(nx, ny, nd)
    }

    self.render = () => {
        let i = 0
        election.getVoterGroups().forEach((g) => {
            voterBasisSet.forEach((b) => {
                i = (i + 1) % 17 // draw only some circles
                if (i === 0) {
                    b.renderAt(g.x, g.y)
                }
            })
        })
        self.noiseImage.render(geoMapWidth, geoMapHeight)

        self.districtMaker.renderVoronoi(geoMapWidth, geoMapHeight)
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
