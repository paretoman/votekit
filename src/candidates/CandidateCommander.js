/** @module */

/**
 * Register clients with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} candidateRegistrar
 * @param {Commander} commander
 * @param {Sim} sim
 * @constructor
 */
export default function CandidateCommander(candidateRegistrar, commander, sim) {
    const self = this

    const prefix = 'candidates'

    self.setEClientList = commander.addClientList({
        action: (id, e) => {
            self.setNumberCandidates(id + 1)
            const candidate = candidateRegistrar.get(id)
            candidate.setEAction(e)
        },
        name: `${prefix}-setE`,
    })

    self.setXYClientList = commander.addClientList({
        action: (id, p) => {
            self.setNumberCandidates(id + 1)
            const candidate = candidateRegistrar.get(id)
            candidate.setXYAction(p)
        },
        name: `${prefix}-setXY`,
        props: { isChain: true },
    })

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    // Well, actually we can just loadCommands in order to avoid undo.
    self.setNumberCandidatesClient = commander.addClient({
        action: (num) => {
            sim.setNumberCandidatesAction(num)
        },
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
    })
    self.setNumberCandidates = (num) => {
        commander.loadCommands([self.setNumberCandidatesClient.command(num)])
    }
}
