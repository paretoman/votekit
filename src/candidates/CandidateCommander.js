/** @module */

/**
 * Register senders with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} candidateRegistrar
 * @param {Commander} commander
 * @param {Sim} sim
 * @constructor
 */
export default function CandidateCommander(candidateRegistrar, commander, sim) {
    const self = this

    const prefix = 'candidates'

    self.setESenderForList = commander.addSenderForList({
        action: (id, e) => {
            self.setNumberCandidates(id + 1)
            const candidate = candidateRegistrar.get(id)
            candidate.setEAction(e)
        },
        name: `${prefix}-setE`,
    })

    self.setP2SenderForList = commander.addSenderForList({
        action: (id, p) => {
            self.setNumberCandidates(id + 1)
            const candidate = candidateRegistrar.get(id)
            candidate.setP2Action(p)
        },
        name: `${prefix}-setP2`,
        props: { isChain: true },
    })

    self.setP1SenderForList = commander.addSenderForList({
        action: (id, p) => {
            self.setNumberCandidates(id + 1)
            const candidate = candidateRegistrar.get(id)
            candidate.setP1Action(p)
        },
        name: `${prefix}-setP1`,
        props: { isChain: true },
    })

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    // Well, actually we can just loadCommands in order to avoid undo.
    self.setNumberCandidatesSender = commander.addSender({
        action: (num) => {
            sim.setNumberCandidatesAction(num)
        },
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
    })
    self.setNumberCandidates = (num) => {
        commander.loadCommands([self.setNumberCandidatesSender.command(num)])
    }
}
