import CandidateDistribution from '../candidates/CandidateDistribution.js'
import CandidateDnCommander from '../candidates/CandidateDnCommander.js'
import CreateAddCandidateDistribution from './CreateAddCandidateDistribution.js'
import Registrar from './Registrar.js'

/** A component of sim.js that deals with adding candidate distributions. */
export default function SimAddCandidateDns(screen, layout, changes, commander, sims) {
    const self = this

    self.canDnButton = new CreateAddCandidateDistribution(layout, self)
    const candidateDnRegistrar = new Registrar()
    const candidateDnCommander = new CandidateDnCommander(candidateDnRegistrar, commander, self)

    self.addCandidateDistributionPressed = () => {
        const num = candidateDnRegistrar.num() + 1
        candidateDnCommander.setNumberCandidateDns(num)
    }
    self.setNumberCandidateDnsAction = (num) => {
        while (candidateDnRegistrar.num() < num) {
            self.addCandidateDistribution(50, 50, 100, false)
        }
    }

    self.addCandidateDistribution = (x, y, r, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidateDistribution = new CandidateDistribution(x, y, r, screen, candidateDnRegistrar, commander, changes, doLoad, candidateDnCommander)
        sims.sample.addSimCandidateDistribution(candidateDistribution)

        const num = candidateDnRegistrar.num()
        candidateDnCommander.setNumberCandidateDns(num)
    }
}
