import Candidate from './Candidate.js'
import CandidateCommander from './CandidateCommander.js'
import { standardizeColor } from '../utilities/jsHelpers.js'
import Registrar from '../sim/Registrar.js'
import getGeoms from '../entities/getGeoms.js'

/** A component of sim.js that deals with adding candidates. */
export default function CandidateList(changes, commander) {
    const self = this
    const candidateRegistrar = new Registrar()
    const candidateCommander = new CandidateCommander(candidateRegistrar, commander, self)

    self.addCandidatePressed = () => {
        // really, we want to make a command to set numCandidates to at least an amount
        const num = candidateRegistrar.num() + 1
        candidateCommander.setNumberCandidates(num)
    }
    self.setNumberCandidatesAction = (num) => {
        while (candidateRegistrar.num() < num) {
            const color = standardizeColor('yellow')
            self.addCandidate({ x: 50, y: 50 }, { x: 50 }, color, false)
        }
    }

    // Publish to View //
    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

    self.addCandidate = (shape2, shape1, c, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidate = new Candidate(shape2, shape1, c, candidateRegistrar, commander, changes, doLoad, candidateCommander)

        updateObservers(candidate)

        const num = candidateRegistrar.num()
        candidateCommander.setNumberCandidates(num)
    }

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
