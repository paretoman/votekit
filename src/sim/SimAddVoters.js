import createAddVoter from './createAddVoter.js'
import Registrar from './Registrar.js'
import VoterCircle from '../voters/VoterCircle.js'
import VoterCircleCommander from '../voters/VoterCircleCommander.js'

/** A component of sim.js that deals with adding voters. */
export default function SimAddVoters(screen, layout, changes, commander, sims) {
    const self = this

    createAddVoter(layout, self)

    const voterRegistrar = new Registrar()
    const voterCommander = new VoterCircleCommander(voterRegistrar, commander, self)

    self.addVoterPressed = () => {
        const num = voterRegistrar.num() + 1
        voterCommander.setNumberVoters(num)
    }
    self.setNumberVotersAction = (num) => {
        while (voterRegistrar.num() < num) {
            self.addVoterCircle(50, 50, 100, false)
        }
    }

    self.addVoterCircle = (x, y, r, doLoad) => {
        // eslint-disable-next-line max-len
        const voterCircle = new VoterCircle(x, y, r, screen, voterRegistrar, commander, changes, doLoad, voterCommander)

        sims.one.addSimVoterCircle(voterCircle)
        sims.geoOne.addSimVoterCircle(voterCircle)
        sims.sample.addSimVoterCircle(voterCircle)

        const num = voterRegistrar.num()
        voterCommander.setNumberVoters(num)
    }
}
