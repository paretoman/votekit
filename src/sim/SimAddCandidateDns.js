import CandidateDn from '../candidateDns/CandidateDn.js'
import CandidateDnCommander from '../candidateDns/CandidateDnCommander.js'
import CreateAddCandidateDistribution from './CreateAddCandidateDistribution.js'
import Registrar from './Registrar.js'

/** A component of sim.js that deals with adding candidate distributions. */
export default function SimAddCandidateDns(screen, layout, changes, commander, sims, sim) {
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
            self.addCandidateDistribution({ x: 50, y: 50, w: 200 }, { x: 50 }, false)
        }
    }

    self.addCandidateDistribution = (shape2, shape1, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidateDn = new CandidateDn(shape2, shape1, screen, candidateDnRegistrar, commander, changes, doLoad, candidateDnCommander, sim)
        sims.sample.addSimCandidateDistribution(candidateDn)

        const num = candidateDnRegistrar.num()
        candidateDnCommander.setNumberCandidateDns(num)
    }
}
