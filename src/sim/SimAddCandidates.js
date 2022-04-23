import Candidate from '../candidates/Candidate.js'
import CandidateCommander from '../candidates/CandidateCommander.js'
import { standardizeColor } from '../utilities/jsHelpers.js'
import CreateAddCandidate from './CreateAddCandidate.js'
import Registrar from './Registrar.js'

/** A component of sim.js that deals with adding candidates. */
export default function SimAddCandidates(screen, layout, changes, commander, sims, sim) {
    const self = this
    self.canButton = new CreateAddCandidate(layout, self)
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

    self.addCandidate = (shape2, shape1, c, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidate = new Candidate(shape2, shape1, 21, 21, c, screen, candidateRegistrar, commander, changes, doLoad, candidateCommander, sim)
        sims.one2D.addSimCandidate(candidate)
        sims.one1D.addSimCandidate(candidate)
        sims.geoOne.addSimCandidate(candidate)

        const num = candidateRegistrar.num()
        candidateCommander.setNumberCandidates(num)
    }
}
