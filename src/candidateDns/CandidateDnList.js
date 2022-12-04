import CandidateDn from './CandidateDn.js'
import CandidateDnCommander from './CandidateDnCommander.js'
import CandidateDnAddMakeButton from '../sim/CandidateDnAddMakeButton.js'
import Registrar from '../sim/Registrar.js'
import CandidateDistributionSampler1D from '../election/CandidateDistributionSampler1D.js'
import CandidateDistributionSampler2D from '../election/CandidateDistributionSampler2D.js'

/** A component of sim.js that deals with adding candidate distributions. */
export default function CandidateDnList(screen, layout, changes, commander, sim) {
    const self = this

    self.canDnButton = new CandidateDnAddMakeButton(layout, self)
    const candidateDnRegistrar = new Registrar()
    const candidateDnCommander = new CandidateDnCommander(candidateDnRegistrar, commander, self)

    self.addCandidateDistributionPressed = () => {
        const num = candidateDnRegistrar.num() + 1
        candidateDnCommander.setNumberCandidateDns(num)
    }
    self.setNumberCandidateDnsAction = (num) => {
        while (candidateDnRegistrar.num() < num) {
            self.addCandidateDistribution({ x: 50, y: 50, w: 200 }, { x: 50, w: 200, densityProfile: 'gaussian' }, false)
        }
    }

    // Observers are lists of graphics in views //
    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

    self.addCandidateDistribution = (shape2, shape1, doLoad) => {
        // eslint-disable-next-line no-new, max-len
        const candidateDn = new CandidateDn(shape2, shape1, screen, candidateDnRegistrar, commander, changes, doLoad, candidateDnCommander, sim)

        updateObservers(candidateDn)

        const num = candidateDnRegistrar.num()
        candidateDnCommander.setNumberCandidateDns(num)
    }

    self.getCandidateDistributions = () => {
        const canDns = candidateDnRegistrar.getList()
        return canDns.filter((c) => c.exists)
    }

    // Update //

    self.update = () => {
        if (changes.checkNone()) return

        self.startSampler()
    }

    self.startSampler = () => {
        const canDnsList = self.getCandidateDistributions()
        if (canDnsList.length === 0) return
        const { dimensions } = sim.election
        const CDnSampler = (dimensions === 1)
            ? CandidateDistributionSampler1D
            : CandidateDistributionSampler2D
        self.sampler = new CDnSampler(canDnsList)
    }
}
