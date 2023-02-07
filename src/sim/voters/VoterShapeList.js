import Registrar from '../entities/Registrar.js'
import VoterShape from './VoterShape.js'
import EntityCommander from '../entities/EntityCommander.js'
import EntityList from '../entities/EntityList.js'

/** A component of sim.js that deals with adding voters. */
export default function VoterShapeList(changes, commander) {
    const self = this

    // Add Entity //

    const prefix = 'voters'
    const voterSenderList = [
        // key, configKey, isChain
        ['exists', 'exists', false],
        ['shape2p', 'shape2D-point', true],
        ['shape1x', 'shape1D-x', true],
        ['shape2w', 'shape2D-width', true],
        ['shape1w', 'shape1D-width', true],
        ['shape1densityProfile', 'shape1D-densityProfile', false],
        ['shape2densityProfile', 'shape2D-densityProfile', false],
    ]
    const registrar = new Registrar()
    EntityList.call(self, commander, prefix, registrar)

    const voterCommander = new EntityCommander(registrar, commander, self, prefix, voterSenderList)
    self.addVoterCircle = ({ shape2, shape1, doLoad }) => {
        // eslint-disable-next-line max-len
        const voterShape = new VoterShape(shape2, shape1, registrar, commander, changes, doLoad, voterCommander)
        self.addEntity(voterShape)
    }
    self.addDefaultEntity = () => {
        self.addVoterCircle({
            shape2: { x: 50, y: 50, w: 200, densityProfile: 'step' },
            shape1: { x: 50, w: 200, densityProfile: 'gaussian' },
            doLoad: false,
        })
    }
}
