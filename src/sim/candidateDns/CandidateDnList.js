import CandidateDn from './CandidateDn.js'
import Registrar from '../sim/Registrar.js'
import getGeoms from '../entities/getGeoms.js'
import EntityCommander from '../entities/EntityCommander.js'

/** A component of sim.js that deals with adding candidate distributions. */
export default function CandidateDnList(changes, commander) {
    const self = this

    // Publish //

    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

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
        ['party', 'party', false],
    ]
    const candidateDnRegistrar = new Registrar()
    const candidateDnCommander = new EntityCommander(candidateDnRegistrar, commander, self, prefix, canDnSenderList)
    self.addCandidateDistribution = ({ shape2, shape1, doLoad }) => {
        // eslint-disable-next-line no-new, max-len
        const candidateDn = new CandidateDn(shape2, shape1, candidateDnRegistrar, commander, changes, doLoad, candidateDnCommander)

        updateObservers(candidateDn)

        const num = candidateDnRegistrar.num()
        self.setNumberEntities(num)
    }
    self.addCandidateDistributionPressed = () => {
        const num = candidateDnRegistrar.num() + 1
        self.setNumberEntities(num)
    }
    self.setNumberEntities = commander.addSender({
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
        action: (num) => {
            while (candidateDnRegistrar.num() < num) {
                self.addDefaultCandidateDistribution()
            }
        },
        // load has no Undo. We can't undo creating an entity.
        // We just set entity.exists to false.
    }).load
    self.addDefaultCandidateDistribution = () => {
        self.addCandidateDistribution({
            shape2: { x: 50, y: 50, w: 200 },
            shape1: { x: 50, w: 200, densityProfile: 'gaussian' },
            doLoad: false,
        })
    }

    // Getters //

    self.getCandidateDistributions = () => {
        const canDns = candidateDnRegistrar.getList()
        return canDns.filter((c) => c.exists)
    }
    self.getGeoms = (dimensions) => getGeoms(self.getCandidateDistributions(), dimensions)

    self.getParties = () => {
        const canList = self.getCandidateDistributions()
        const partiesByCan = getPartyByCan(canList)
        // TODO: figure out how to vary the number of parties, allow skipping etc.
        const numParties = 10
        const parties = { partiesByCan, numParties }
        return parties
    }

    // TODO: consider more than one party for a candidate.
    function getPartyByCan(canList) { return canList.map((can) => can.party[0]) }
}
