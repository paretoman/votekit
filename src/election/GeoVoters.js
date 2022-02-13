import GeoNoise from './geoNoise.js'
import NoiseImage from './NoiseImage.js'
import DistrictMaker from './DistrictMaker.js'
import { range } from './jsHelpers.js'

export default function GeoVoters(screen) {
    const self = this

    /** Number of districts */
    const nd = 100

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

    /** This voter basis is repeated at every census tract on the geo map.
     *  It is altered by translating it in policy space.
     *  */
    const voterBasisSet = []

    self.newVoterBasis = function (voterBasis) {
        voterBasisSet.push(voterBasis)
    }
    self.clear = () => {
        voterBasisSet.splice(0, voterBasisSet.length)
    }

    // VoterGroup Sets //

    /** Make districts and update voter sets */
    self.update = () => {
        self.updateDistricts()
        self.updateVotes()
    }
    self.updateDistricts = () => {
        self.districtMaker.make(nx, ny, nd)
    }
    self.updateVotes = () => {
        self.updateFullSet()
        self.updateVotersByDistrict()
        self.updateVotersByTract()
    }

    self.updateFullSet = () => {
        const { sn } = self.geoNoise
        self.allVoterGroups = voterBasisSet.map(
            (vb) => sn.map(
                (rowNoise) => rowNoise.map(
                    (cellNoise) => {
                        const [xNoise, yNoise] = cellNoise
                        return { x: vb.x + xNoise, y: vb.y + yNoise, r: vb.r }
                    },
                ).flat(),
            ).flat(),
        ).flat()
    }

    self.updateVotersByDistrict = () => {
        const { census } = self.districtMaker
        const { sn } = self.geoNoise
        self.voterGroupsByDistrict = range(nd).map(
            (iDistrict) => voterBasisSet.map(
                (vb) => census[iDistrict].map((g) => {
                    const [gx, gy, gf] = g
                    const [xNoise, yNoise] = sn[gx][gy]
                    return {
                        x: vb.x + xNoise, y: vb.y + yNoise, r: vb.r, f: gf,
                    }
                }).flat(),
            ).flat(),
        )
    }

    self.updateVotersByTract = () => {
        const { sn } = self.geoNoise
        self.voterGroupsByTract = sn.map(
            (rowNoise) => rowNoise.map(
                (cellNoise) => voterBasisSet.map(
                    (vb) => {
                        const [xNoise, yNoise] = cellNoise
                        return { x: vb.x + xNoise, y: vb.y + yNoise, r: vb.r }
                    },
                ).flat(),
            ),
        )
    }
}
