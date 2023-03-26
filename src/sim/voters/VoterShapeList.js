import Registrar from '../entities/Registrar.js'
import VoterShape from './VoterShape.js'
import EntityCommander from '../entities/EntityCommander.js'
import EntityList from '../entities/EntityList.js'
import { getCDF, normalizePDF } from '../../election/src/election/mathHelpers.js'
import defaultStrategyRules from '../entities/defaultStrategyRules.js'

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
        ['actionWeight', 'strategyRules', true],
        ['strategy', 'strategyRules', false],
        ['actionOptionThreshold', 'strategyRules', true],
        ['party', 'party', false],
    ]
    const registrar = new Registrar()
    EntityList.call(self, commander, prefix, registrar)

    const voterCommander = new EntityCommander(registrar, commander, self, prefix, voterSenderList)
    self.addVoterCircle = ({ shape2, shape1, strategyRules, doLoad }) => {
        // eslint-disable-next-line max-len
        const voterShape = new VoterShape(shape2, shape1, strategyRules, registrar, commander, changes, doLoad, voterCommander)
        self.addEntity(voterShape)
    }
    self.addDefaultEntity = () => {
        self.addVoterCircle({
            shape2: { x: 50, y: 50, w: 200, densityProfile: 'step' },
            shape1: { x: 50, w: 200, densityProfile: 'gaussian' },
            strategyRules: defaultStrategyRules,
            doLoad: false,
        })
    }

    self.getVoterStrategyListByPhase = (sequenceOptions) => {
        // for each phase, we need a voterStrategyList entry
        const { sequenceName, sequences } = sequenceOptions
        const { phases } = sequences[sequenceName]

        const voterStrategyListByPhase = {}

        Object.keys(phases).forEach((phaseName) => {
            const phase = phases[phaseName]
            const { voteCasterName } = phase
            const voterStrategyList = getStrategyList(voteCasterName, phaseName)
            voterStrategyListByPhase[phaseName] = voterStrategyList
        })
        return voterStrategyListByPhase
    }
    function getStrategyList(voteCasterName, phaseName) {
        const voterStrategyList = []
        const entities = self.getEntities()
        for (let i = 0; i < entities.length; i += 1) {
            const entity = entities[i]
            const strategy = getStrategy(entity.strategyRules, voteCasterName, phaseName)
            const actionPDF = normalizePDF(strategy.map((a) => a.actionWeight))
            const strategyCDF = getCDF(actionPDF)
            voterStrategyList.push({ strategy, strategyCDF })
        }
        return voterStrategyList
    }

    // find the strategy that matches all the conditions, if there are conditions.
    function getStrategy(strategyRules, voteCasterName, phaseName) {
        for (let i = 0; i < strategyRules.length; i += 1) {
            const s = strategyRules[i]
            if (s.condition.phaseName !== undefined) {
                if (s.condition.phaseName !== phaseName) {
                    continue
                }
            }
            if (s.condition.voteCasterName !== undefined) {
                if (s.condition.voteCasterName !== voteCasterName) {
                    continue
                }
            }
            // the strategy rule applies if we got through the previous two checks
            return s.strategy
        }
        return undefined
    }

    self.getParties = () => {
        // TODO: consider more than one party for a voterShape.
        const entities = self.getEntities()
        const voterParties = entities.map((voter) => voter.party[0])
        return voterParties
    }
}
