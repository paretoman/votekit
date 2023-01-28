import Registrar from '../sim/Registrar.js'
import VoterShape from './VoterShape.js'
import VoterCommander from './VoterCommander.js'
import getGeoms from '../entities/getGeoms.js'

/** A component of sim.js that deals with adding voters. */
export default function VoterShapeList(changes, commander) {
    const self = this

    // Publish //

    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

    // Add Entity //

    const voterRegistrar = new Registrar()
    const voterCommander = new VoterCommander(voterRegistrar, commander, self)
    self.addVoterPressed = () => {
        const num = voterRegistrar.num() + 1
        voterCommander.setNumberVoters(num)
    }
    self.setNumberVotersAction = (num) => {
        while (voterRegistrar.num() < num) {
            self.addVoterCircle({
                shape2: { x: 50, y: 50, w: 200 },
                shape1: { x: 50, w: 200, densityProfile: 'gaussian' },
                doLoad: false,
            })
        }
    }
    self.addVoterCircle = ({ shape2, shape1, doLoad }) => {
        // eslint-disable-next-line max-len
        const voterShape = new VoterShape(shape2, shape1, voterRegistrar, commander, changes, doLoad, voterCommander)

        updateObservers(voterShape)

        const num = voterRegistrar.num()
        voterCommander.setNumberVoters(num)
    }

    // Getters //

    self.getVoterShapes = () => voterRegistrar.getList().filter((v) => v.exists)
    self.getGeoms = (dimensions) => getGeoms(self.getVoterShapes(), dimensions)
}
