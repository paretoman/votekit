/** @module */

/**
 * Register senders with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} candidateDnRegistrar
 * @param {Commander} commander
 * @param {Sim} sim
 * @constructor
 */
export default function CandidateDnCommander(candidateDnRegistrar, commander, sim) {
    const self = this

    const prefix = 'candidateDns'

    // a object with senders that set parameters for lists of entities.
    // Like if you want to set the exists property of the 2nd candidate to 1.
    self.setForListSenders = {}

    function makeSetForListSender(key, configKey, isChain) {
        self.setForListSenders[key] = commander.addSenderForList({
            action: (id, e) => {
                self.setNumberCandidateDns(id + 1)
                const candidateDn = candidateDnRegistrar.get(id)
                candidateDn.setAction[key](e)
            },
            name: `${prefix}-${configKey}`,
            props: { isChain },
        })
    }

    makeSetForListSender('exists', 'exists', false)
    makeSetForListSender('shape2p', 'shape2D-point', true)
    makeSetForListSender('shape1x', 'shape1D-x', true)
    makeSetForListSender('shape2w', 'shape2D-width', true)
    makeSetForListSender('shape1w', 'shape1D-width', true)
    makeSetForListSender('shape1densityProfile', 'shape1D-densityProfile', false)

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    self.setNumberCandidateDnsSender = commander.addSender({
        action: (num) => {
            sim.setNumberCandidateDnsAction(num)
        },
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
    })
    self.setNumberCandidateDns = (num) => {
        commander.loadCommands([self.setNumberCandidateDnsSender.command(num)])
    }
}
