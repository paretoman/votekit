import Registrar from '../entities/Registrar.js'
import VoterShape from './VoterShape.js'
import EntityCommander from '../entities/EntityCommander.js'
import EntityList from '../entities/EntityList.js'
import { getCDF, normalizePDF } from '../../election/src/election/mathHelpers.js'
import defaultStrategy from '../entities/defaultStrategy.js'

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
        ['actionWeight', 'actionList', true],
        ['actionList', 'actionList', false],
        ['actionOptionThreshold', 'actionList', true],
    ]
    const registrar = new Registrar()
    EntityList.call(self, commander, prefix, registrar)

    const voterCommander = new EntityCommander(registrar, commander, self, prefix, voterSenderList)
    self.addVoterCircle = ({ shape2, shape1, strategy, doLoad }) => {
        // eslint-disable-next-line max-len
        const voterShape = new VoterShape(shape2, shape1, strategy, registrar, commander, changes, doLoad, voterCommander)
        self.addEntity(voterShape)
    }
    self.addDefaultEntity = () => {
        self.addVoterCircle({
            shape2: { x: 50, y: 50, w: 200, densityProfile: 'step' },
            shape1: { x: 50, w: 200, densityProfile: 'gaussian' },
            strategy: defaultStrategy,
            doLoad: false,
        })
    }

    self.getVoterStrategyList = (voteCasterName) => {
        const voterStrategyList = []
        const entities = self.getEntities()
        for (let i = 0; i < entities.length; i += 1) {
            const entity = entities[i]
            const { actionList } = entity.strategy[voteCasterName]
            const actionPDF = normalizePDF(actionList.map((a) => a.actionWeight))
            const actionCDF = getCDF(actionPDF)
            voterStrategyList.push({ actionList, actionCDF })
        }
        return voterStrategyList
    }
}
