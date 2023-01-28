import Registrar from '../sim/Registrar.js'
import VoterShape from './VoterShape.js'
import getGeoms from '../entities/getGeoms.js'
import EntityCommander from '../entities/EntityCommander.js'

/** A component of sim.js that deals with adding voters. */
export default function VoterShapeList(changes, commander) {
    const self = this

    // Publish //

    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

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
    ]
    const voterRegistrar = new Registrar()
    const voterCommander = new EntityCommander(voterRegistrar, commander, self, prefix, voterSenderList)
    self.addVoterCircle = ({ shape2, shape1, doLoad }) => {
        // eslint-disable-next-line max-len
        const voterShape = new VoterShape(shape2, shape1, voterRegistrar, commander, changes, doLoad, voterCommander)

        updateObservers(voterShape)

        const num = voterRegistrar.num()
        self.setNumberEntities(num)
    }
    self.addVoterPressed = () => {
        const num = voterRegistrar.num() + 1
        self.setNumberEntities(num)
    }
    self.setNumberEntities = commander.addSender({
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
        action: (num) => {
            while (voterRegistrar.num() < num) {
                self.addDefaultVoterCircle()
            }
        },
        // load has no Undo. We can't undo creating an entity.
        // We just set entity.exists to false.
    }).load
    self.addDefaultVoterCircle = () => {
        self.addVoterCircle({
            shape2: { x: 50, y: 50, w: 200 },
            shape1: { x: 50, w: 200, densityProfile: 'gaussian' },
            doLoad: false,
        })
    }

    // Getters //

    self.getVoterShapes = () => voterRegistrar.getList().filter((v) => v.exists)
    self.getGeoms = (dimensions) => getGeoms(self.getVoterShapes(), dimensions)
}
