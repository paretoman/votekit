/** @module */

import CastOptionsMan from './CastOptionsMan.js'
import SequenceOptionsMan from './SequenceOptionsMan.js'

/**
 * Here we are in the context of a single election.
 * @constructor
 */
export default function ElectionOptionsMan(changes, simOptions, commander) {
    const self = this

    const electionOptions = {
        pollCount: 5,
        numSampleCandidates: 5,
    }
    self.castOptionsMan = new CastOptionsMan(changes, simOptions, electionOptions)
    self.sequenceOptionsMan = new SequenceOptionsMan(changes, commander)

    self.init = () => {
        // Defaults
        self.sequenceOptionsMan.init()
        self.setNumTracts(1)
        self.setNumDistricts(1)
    }

    self.setNumDistricts = commander.addSender({
        name: 'numDistricts',
        currentValue: electionOptions.numDistricts,
        action(n) {
            electionOptions.numDistricts = n
            const useDistricts = n > 1
            const useTracts = electionOptions.numTracts > 1
            electionOptions.useGeography = useTracts || useDistricts
            changes.add(['numDistricts'])
        },
    }).go

    self.setNumTracts = commander.addSender({
        name: 'numTracts',
        currentValue: electionOptions.numTracts,
        action(n) {
            electionOptions.numTracts = n
            const useTracts = n > 1
            const useDistricts = electionOptions.numDistricts > 1
            electionOptions.useGeography = useTracts || useDistricts
            changes.add(['numTracts'])
        },
    }).go

    self.update = () => {
        self.castOptionsMan.update()
        self.sequenceOptionsMan.update()

        if (changes.check(['socialChoiceMethod'])) {
            const sequenceOptions = self.sequenceOptionsMan.getOptions()
            const { socialChoiceType } = sequenceOptions.sequences.general.phases.general // todo: make this more general
            if (socialChoiceType === 'allocation') {
                electionOptions.numSampleCandidates = 10
            } else if (socialChoiceType === 'multiWinner') {
                electionOptions.numSampleCandidates = 10
            } else { // 'singleWinner'
                electionOptions.numSampleCandidates = 5
            }
        }
    }

    self.getOptions = () => {
        const eo = { ...electionOptions }
        eo.castOptions = self.castOptionsMan.getOptions()
        eo.sequenceOptions = self.sequenceOptionsMan.getOptions()
        return eo
    }

    self.init()
}
