import Candidate from './Candidate.js'
import { standardizeColor } from '../../util/jsHelpers.js'
import Registrar from '../entities/Registrar.js'
import EntityCommander from '../entities/EntityCommander.js'
import EntityList from '../entities/EntityList.js'

/** A component of sim.js that deals with adding candidates. */
export default function CandidateList(changes, commander) {
    const self = this

    // Add Entity //

    const prefix = 'candidates'
    const canSenderList = [
        // key, configKey, isChain
        ['exists', 'exists', false],
        ['shape2p', 'shape2D-point', true],
        ['shape1x', 'shape1D-x', true],
        ['color', 'color', false],
        ['party', 'party', false],
    ]
    const registrar = new Registrar()
    EntityList.call(self, commander, prefix, registrar)

    const candidateCommander = new EntityCommander(registrar, commander, self, prefix, canSenderList)
    self.addCandidate = ({ shape2, shape1, color, doLoad }) => {
        // eslint-disable-next-line no-new, max-len
        const candidate = new Candidate(shape2, shape1, color, registrar, commander, changes, doLoad, candidateCommander)
        self.addEntity(candidate)
    }
    self.addDefaultEntity = () => {
        self.addCandidate({
            shape2: { x: 50, y: 50 },
            shape1: { x: 50 },
            color: standardizeColor('yellow'),
            doLoad: false,
        })
    }

    // Getters //

    self.getParties = () => {
        const canList = self.getEntities()
        const partiesByCan = getPartyByCan(canList)
        // TODO: figure out how to vary the number of parties, allow skipping etc.
        const numParties = 10
        const parties = { partiesByCan, numParties }
        return parties
    }

    // TODO: consider more than one party for a candidate.
    function getPartyByCan(canList) { return canList.map((can) => can.party[0]) }

    self.getRGBAList = () => {
        const canList = self.getEntities()
        return canList.map((c) => c.colorRGBA)
    }
}
