import CandidateDn from './CandidateDn.js'
import CandidateDnCommander from './CandidateDnCommander.js'
import Registrar from '../sim/Registrar.js'
import getGeoms from '../entities/getGeoms.js'

/** A component of sim.js that deals with adding candidate distributions. */
export default function CandidateDnList(changes, commander) {
    const self = this

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
        const candidateDn = new CandidateDn(shape2, shape1, candidateDnRegistrar, commander, changes, doLoad, candidateDnCommander)

        updateObservers(candidateDn)

        const num = candidateDnRegistrar.num()
        candidateDnCommander.setNumberCandidateDns(num)
    }

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
