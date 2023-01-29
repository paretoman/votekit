import CandidateDn from './CandidateDn.js'
import Registrar from '../sim/Registrar.js'
import EntityCommander from '../entities/EntityCommander.js'
import EntityList from '../entities/EntityList.js'

/** A component of sim.js that deals with adding candidate distributions. */
export default function CandidateDnList(changes, commander) {
    const self = this

    // Add Entity //

    const prefix = 'candidateDns'
    const canDnSenderList = [
        // key, configKey, isChain
        ['exists', 'exists', false],
        ['shape2p', 'shape2D-point', true],
        ['shape1x', 'shape1D-x', true],
        ['shape2w', 'shape2D-width', true],
        ['shape1w', 'shape1D-width', true],
        ['shape1densityProfile', 'shape1D-densityProfile', false],
        ['shape2densityProfile', 'shape2D-densityProfile', false],
        ['party', 'party', false],
    ]
    const registrar = new Registrar()
    EntityList.call(self, commander, prefix, registrar)

    const candidateDnCommander = new EntityCommander(registrar, commander, self, prefix, canDnSenderList)
    self.addCandidateDistribution = ({ shape2, shape1, doLoad }) => {
        // eslint-disable-next-line no-new, max-len
        const candidateDn = new CandidateDn(shape2, shape1, registrar, commander, changes, doLoad, candidateDnCommander)
        self.addEntity(candidateDn)
    }
    self.addDefaultEntity = () => {
        self.addCandidateDistribution({
            shape2: { x: 50, y: 50, w: 200, densityProfile: 'step' },
            shape1: { x: 50, w: 200, densityProfile: 'gaussian' },
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
}
