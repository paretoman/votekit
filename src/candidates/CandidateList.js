import Candidate from './Candidate.js'
import CandidateCommander from './CandidateCommander.js'
import { standardizeColor } from '../utilities/jsHelpers.js'
import CandidateAddMakeButton from '../sim/CandidateAddMakeButton.js'
import Registrar from '../sim/Registrar.js'

/** A component of sim.js that deals with adding candidates. */
export default function CandidateList(layout, changes, commander, sim) {
    const self = this
    self.canButton = new CandidateAddMakeButton(layout, self)
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
        const candidate = new Candidate(shape2, shape1, c, candidateRegistrar, commander, changes, doLoad, candidateCommander, sim)

        updateObservers(candidate)

        const num = candidateRegistrar.num()
        candidateCommander.setNumberCandidates(num)
    }

    self.getCandidates = () => candidateRegistrar.getList().filter((c) => c.exists)
}
