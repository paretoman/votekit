import VoterShapeAddMakeButton from '../sim/VoterShapeAddMakeButton.js'
import Registrar from '../sim/Registrar.js'
import VoterShape from './VoterShape.js'
import VoterCommander from './VoterCommander.js'

/** A component of sim.js that deals with adding voters. */
export default function VoterShapeAdd(screen, layout, changes, commander, sim) {
    const self = this

    VoterShapeAddMakeButton(layout, self)

    const voterRegistrar = new Registrar()
    const voterCommander = new VoterCommander(voterRegistrar, commander, self)

    self.addVoterPressed = () => {
        const num = voterRegistrar.num() + 1
        voterCommander.setNumberVoters(num)
    }
    self.setNumberVotersAction = (num) => {
        while (voterRegistrar.num() < num) {
            self.addVoterCircle({ x: 50, y: 50, w: 200 }, { x: 50, w: 200, densityProfile: 'gaussian' }, false)
        }
    }

    // Observers are lists of graphics in views //
    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

    self.addVoterCircle = (shape2, shape1, doLoad) => {
        // eslint-disable-next-line max-len
        const voterShape = new VoterShape(shape2, shape1, screen, voterRegistrar, commander, changes, doLoad, voterCommander, sim)

        updateObservers(voterShape)

        const num = voterRegistrar.num()
        voterCommander.setNumberVoters(num)
    }
}
