/** @module */

import GeoNoise from './geoNoise.js'
import NoiseImage from './NoiseImage.js'
import DistrictMaker from './DistrictMaker.js'
import { range } from '../utilities/jsHelpers.js'
import SimVoterList from './SimVoterList.js'

/**
 * GeoVoters inherits from SimVoterList.
 * @param {Screen} screen
 * @param {GeoElection} geoElection
 * @constructor
 */
export default function GeoVoters(screen, geoElection) {
    const self = this

    // GeoVoters inherits from SimVoterList
    // because we need to make a list instances of geoVoterBasis,
    // and geoVoterBasis has a component called voter.
    SimVoterList.call(self)

    /** Number of districts */
    const nd = 20

    /** Number of census tracts in x and y */
    const nx = 20
    const ny = 20

    // Code that handles drawing districts of equal number of voters.
    self.districtMaker = new DistrictMaker(screen)

    // Code that handles making geographic noise.
    self.geoNoise = new GeoNoise(nx, ny)
    self.geoNoise.genNoise()

    // Code that handles making images of geographic noise.
    self.noiseImage = new NoiseImage(nx, ny, screen)

    // Manage VoterBasisSet //

    /** This voter basis is repeated at every census tract on the geo map.
     *  It is altered by translating it in policy space.
     *  */

    // Update VoterGroup Sets //

    let simVoterGroups = []

    /** Make districts and update voter sets */
    self.updateDistricts = () => {
        self.districtMaker.make(nx, ny, nd)
    }
    self.updateVoters = () => {
        simVoterGroups = self.getSimVoterGroups()
        self.updateFullSet()
        self.updateVotersByDistrict()
        self.updateVotersByTract()
    }

    self.updateFullSet = () => {
        const { sn } = self.geoNoise
        self.allVoterGroups = simVoterGroups.map(
            (vb) => sn.map(
                (rowNoise) => rowNoise.map(
                    (cellNoise) => {
                        const [xNoise, yNoise] = cellNoise
                        const { w2, densityProfile1 } = vb.voter
                        const { x, y } = vb.voter.p2
                        return { p2: { x: x + xNoise, y: y + yNoise }, w2, densityProfile1 }
                    },
                ).flat(),
            ).flat(),
        ).flat()
    }

    self.updateVotersByDistrict = () => {
        const { census } = self.districtMaker
        const { sn } = self.geoNoise
        self.voterGroupsByDistrict = range(nd).map(
            (iDistrict) => simVoterGroups.map(
                (vb) => census[iDistrict].map((g) => {
                    const [gx, gy, gf] = g
                    const [xNoise, yNoise] = sn[gx][gy]
                    const { w2, densityProfile1 } = vb.voter
                    const { x, y } = vb.voter.p2
                    return {
                        p2: { x: x + xNoise, y: y + yNoise }, w2, densityProfile1, weight: gf,
                    }
                }).flat(),
            ).flat(),
        )
    }

    self.updateVotersByTract = () => {
        const { sn } = self.geoNoise
        self.voterGroupsByTract = sn.map(
            (rowNoise) => rowNoise.map(
                (cellNoise) => simVoterGroups.map(
                    (vb) => {
                        const [xNoise, yNoise] = cellNoise
                        const { w2, densityProfile1 } = vb.voter
                        const { x, y } = vb.voter.p2
                        return { p2: { x: x + xNoise, y: y + yNoise }, w2, densityProfile1 }
                    },
                ).flat(),
            ),
        )
    }

    // Display //

    const geoMapWidth = 100
    const geoMapHeight = 100

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
        self.districtMaker.renderVoronoi(geoMapWidth, geoMapHeight)
    }
    // Render district wins.
    self.renderDistrictWins = () => {
        const { renderVoronoiColors } = self.districtMaker
        renderVoronoiColors(200, 0, geoMapWidth, geoMapHeight, geoElection.winnerColors)
    }
    // render district votes.
    self.renderDistrictVotes = () => {
        const { renderVoronoiColors } = self.districtMaker
        renderVoronoiColors(100, 0, geoMapWidth, geoMapHeight, geoElection.blendColors)
    }
    self.renderVoterBasisSet = () => {
        simVoterGroups.forEach((v) => v.render())
    }

    /** Draw dots to represent the political diversity across census tracts. */
    function renderPolicyNoise() {
        self.voterGroupsByTract.forEach((row) => {
            row.forEach((cell) => {
                cell.forEach((group) => {
                    smallCircle(group.p2.x, group.p2.y)
                })
            })
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
