import Candidate from './Candidate.js'
import { standardizeColor } from '../../utilities/jsHelpers.js'
import Registrar from '../sim/Registrar.js'
import getGeoms from '../entities/getGeoms.js'
import EntityCommander from '../entities/EntityCommander.js'

/** A component of sim.js that deals with adding candidates. */
export default function CandidateList(changes, commander) {
    const self = this

    // Publish //

    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

    // Add Entity //

    const prefix = 'candidates'
    const candidateSenderList = [
        // key, configKey, isChain
        ['exists', 'exists', false],
        ['shape2p', 'shape2D-point', true],
        ['shape1x', 'shape1D-x', true],
        ['color', 'color', false],
        ['party', 'party', false],
    ]
    const candidateRegistrar = new Registrar()
    const candidateCommander = new EntityCommander(candidateRegistrar, commander, self, prefix, candidateSenderList)
    self.addCandidate = ({ shape2, shape1, color, doLoad }) => {
        // eslint-disable-next-line no-new, max-len
        const candidate = new Candidate(shape2, shape1, color, candidateRegistrar, commander, changes, doLoad, candidateCommander)

        updateObservers(candidate)

        const num = candidateRegistrar.num()
        self.setNumberEntities(num)
    }
    self.addCandidatePressed = () => {
        // really, we want to make a command to set numCandidates to at least an amount
        const num = candidateRegistrar.num() + 1
        self.setNumberEntities(num)
    }
    self.setNumberEntities = commander.addSender({
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
        action: (num) => {
            while (candidateRegistrar.num() < num) {
                self.addDefaultCandidate()
            }
        },
        // load has no Undo. We can't undo creating an entity.
        // We just set entity.exists to false.
    }).load
    self.addDefaultCandidate = () => {
        self.addCandidate({
            shape2: { x: 50, y: 50 },
            shape1: { x: 50 },
            color: standardizeColor('yellow'),
            doLoad: false,
        })
    }

    // Getters //

    self.getCandidates = () => candidateRegistrar.getList().filter((c) => c.exists)
    self.getGeoms = (dimensions) => getGeoms(self.getCandidates(), dimensions)

    self.getParties = () => {
        const canList = self.getCandidates()
        const partiesByCan = getPartyByCan(canList)
        // TODO: figure out how to vary the number of parties, allow skipping etc.
        const numParties = 10
        const parties = { partiesByCan, numParties }
        return parties
    }

    // TODO: consider more than one party for a candidate.
    function getPartyByCan(canList) { return canList.map((can) => can.party[0]) }

    self.getRGBAList = () => {
        const canList = self.getCandidates()
        return canList.map((c) => c.colorRGBA)
    }
}
