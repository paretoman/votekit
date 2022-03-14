/** @module */

/**
 * Register clients with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} voterRegistrar
 * @param {Commander} commander
 * @param {Sim} sim
 * @constructor
 */
export default function VoterCircleCommander(voterRegistrar, commander, sim) {
    const self = this

    const prefix = 'voters'

    self.setEClientList = commander.addClientList({
        action: (id, e) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setEAction(e)
        },
        name: `${prefix}-setE`,
    })

    self.setXYClientList = commander.addClientList({
        action: (id, p) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setXYAction(p)
        },
        name: `${prefix}-setXY`,
        props: { isSetXY: true },
    })

    self.setRClientList = commander.addClientList({
        action: (id, r) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setRAction(r)
        },
        name: `${prefix}-setR`,
    })

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    self.setNumberVotersClient = commander.addClient({
        action: (num) => sim.setNumberVotersAction(num),
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
    })
    self.setNumberVoters = (num) => {
        commander.loadCommands([self.setNumberVotersClient.command(num)])
    }
}
