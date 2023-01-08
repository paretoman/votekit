/** @module */

/**
 * Register senders with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} candidateRegistrar
 * @param {Commander} commander
 * @param {CandidateList} canList
 * @constructor
 */
export default function CandidateCommander(candidateRegistrar, commander, canList) {
    const self = this

    const prefix = 'candidates'

    // a object with senders that set parameters for lists of entities.
    // Like if you want to set the exists property of the 2nd candidate to 1.
    self.setForListSenders = {}

    function makeSetForListSender(key, configKey, isChain) {
        self.setForListSenders[key] = commander.addSenderForList({
            action: (id, e) => {
                self.setNumberCandidates(id + 1)
                const candidate = candidateRegistrar.get(id)
                candidate.setAction[key](e)
            },
            name: `${prefix}-${configKey}`,
            props: { isChain },
        })
    }

    makeSetForListSender('exists', 'exists', false)
    makeSetForListSender('shape2p', 'shape2D-point', true)
    makeSetForListSender('shape1x', 'shape1D-x', true)
    makeSetForListSender('color', 'color', false)
    makeSetForListSender('party', 'party', false)

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    // Well, actually we can just loadCommands in order to avoid undo.
    self.setNumberCandidatesSender = commander.addSender({
        action: (num) => {
            canList.setNumberCandidatesAction(num)
        },
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
    })
    self.setNumberCandidates = (num) => {
        commander.loadCommands([self.setNumberCandidatesSender.command(num)])
    }
}
