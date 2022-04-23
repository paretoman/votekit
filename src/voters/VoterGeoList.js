/** @module */

import GeoNoise from './geoNoise.js'
import NoiseImage from '../viz/NoiseImage.js'
import DistrictMaker from './DistrictMaker.js'
import { range } from '../utilities/jsHelpers.js'
import VoterSimList from './VoterSimList.js'

/**
 * VoterGeoList inherits from VoterSimList.
 * @param {Screen} screen
 * @param {GeoElection} geoElection
 * @constructor
 */
export default function VoterGeoList(screen, geoElection, sim) {
    const self = this

    // VoterGeoList inherits from VoterSimList
    // because we need to make a list instances of voterGeoBasis,
    // and voterGeoBasis has a component called voter.
    VoterSimList.call(self, sim)

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

    // We want to copy a set of voter basis objects for each census tract.
    // Then we add a little noise to represent differences due to geography.

    self.updateFullSet = () => {
        const { sn } = self.geoNoise
        self.allVoterGroups = simVoterGroups.map(
            (vb) => sn.map(
                (rowNoise) => rowNoise.map(
                    (cellNoise) => {
                        const [xNoise, yNoise] = cellNoise
                        const shape2 = structuredClone(vb.voter.shape2)
                        shape2.x += xNoise
                        shape2.y += yNoise
                        const { shape1 } = vb.voter
                        return { shape2, shape1 }
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
                    const shape2 = structuredClone(vb.voter.shape2)
                    shape2.x += xNoise
                    shape2.y += yNoise
                    const { shape1 } = vb.voter
                    return { shape2, shape1, weight: gf }
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
                        const shape2 = structuredClone(vb.voter.shape2)
                        shape2.x += xNoise
                        shape2.y += yNoise
                        const { shape1 } = vb.voter
                        return { shape2, shape1 }
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
                    smallCircle(group.shape2.x, group.shape2.y)
                    // TODO: use .x and .y instead of shape2
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
