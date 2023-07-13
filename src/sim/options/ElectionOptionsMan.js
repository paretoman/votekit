/** @module */

import CastOptionsMan from './CastOptionsMan.js'
import SequenceOptionsMan from './SequenceOptionsMan.js'

/**
 * Here we are in the context of a single election.
 * @constructor
 */
export default function ElectionOptionsMan(changes, simOptions, commander) {
    const self = this

    const optionsBag = {
        pollCount: 5,
        numSampleCandidates: 5,
    }
    self.castOptionsMan = new CastOptionsMan(changes, simOptions, optionsBag)
    self.sequenceOptionsMan = new SequenceOptionsMan(changes, commander)

    self.init = () => {
        // Defaults
        self.sequenceOptionsMan.init()
        self.setNumTracts(1)
        self.setNumDistricts(1)
    }

    self.setNumDistricts = commander.addSender({
        name: 'numDistricts',
        currentValue: optionsBag.numDistricts,
        action(n) {
            optionsBag.numDistricts = n
            const useDistricts = n > 1
            const useTracts = optionsBag.numTracts > 1
            optionsBag.useGeography = useTracts || useDistricts
            changes.add(['numDistricts'])
        },
    }).go

    self.setNumTracts = commander.addSender({
        name: 'numTracts',
        currentValue: optionsBag.numTracts,
        action(n) {
            optionsBag.numTracts = n
            const useTracts = n > 1
            const useDistricts = optionsBag.numDistricts > 1
            optionsBag.useGeography = useTracts || useDistricts
            changes.add(['numTracts'])
        },
    }).go

    self.update = () => {
        self.castOptionsMan.update()
        self.sequenceOptionsMan.update()

        if (changes.check(['socialChoiceMethod'])) {
            const sequenceOptions = self.sequenceOptionsMan.getOptions()
            const { sequenceName } = sequenceOptions
            const { finalPhaseBySequence } = self.sequenceOptionsMan
            const finalPhaseName = finalPhaseBySequence[sequenceName]

            const { socialChoiceType } = sequenceOptions.sequences[sequenceName].phases[finalPhaseName]
            if (socialChoiceType === 'allocation') {
                optionsBag.numSampleCandidates = 10
            } else if (socialChoiceType === 'multiWinner') {
                optionsBag.numSampleCandidates = 10
            } else { // 'singleWinner'
                optionsBag.numSampleCandidates = 5
            }
        }
    }

    self.getOptions = () => {
        const ob = { ...optionsBag }
        ob.castOptions = self.castOptionsMan.getOptions()
        ob.sequenceOptions = self.sequenceOptionsMan.getOptions()
        return ob
    }

    self.init()
}
