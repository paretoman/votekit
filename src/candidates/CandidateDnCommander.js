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

    self.setESenderForList = commander.addSenderForList({
        action: (id, e) => {
            self.setNumberCandidateDns(id + 1)
            const candidateDn = candidateDnRegistrar.get(id)
            candidateDn.setEAction(e)
        },
        name: `${prefix}-exists`,
    })

    self.setP2SenderForList = commander.addSenderForList({
        action: (id, p) => {
            self.setNumberCandidateDns(id + 1)
            const candidateDn = candidateDnRegistrar.get(id)
            candidateDn.setP2Action(p)
        },
        name: `${prefix}-d2-p`,
        props: { isChain: true },
    })

    self.setP1SenderForList = commander.addSenderForList({
        action: (id, p) => {
            self.setNumberCandidateDns(id + 1)
            const candidateDn = candidateDnRegistrar.get(id)
            candidateDn.setP1Action(p)
        },
        name: `${prefix}-d1-x`,
        props: { isChain: true },
    })

    self.setW2SenderForList = commander.addSenderForList({
        action: (id, w2) => {
            self.setNumberCandidateDns(id + 1)
            const candidateDn = candidateDnRegistrar.get(id)
            candidateDn.setW2Action(w2)
        },
        name: `${prefix}-d2-w`,
    })

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
