/** @module */

/**
 * Register senders with the commander for setting entity values.
 * This is here because we need an action that takes an id.
 * @param {Registrar} voterRegistrar
 * @param {Commander} commander
 * @param {SimAddVoters} simAddVoters
 * @constructor
 */
export default function VoterCircleCommander(voterRegistrar, commander, simAddVoters) {
    const self = this

    const prefix = 'voters'

    self.setESenderForList = commander.addSenderForList({
        action: (id, e) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setEAction(e)
        },
        name: `${prefix}-exists`,
    })

    self.setP2SenderForList = commander.addSenderForList({
        action: (id, p) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setP2Action(p)
        },
        name: `${prefix}-2D-point`,
        props: { isChain: true },
    })

    self.setP1SenderForList = commander.addSenderForList({
        action: (id, p) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setP1Action(p)
        },
        name: `${prefix}-1D-x`,
        props: { isChain: true },
    })

    self.setW2SenderForList = commander.addSenderForList({
        action: (id, w) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setW2Action(w)
        },
        name: `${prefix}-2D-width`,
    })

    self.setW1SenderForList = commander.addSenderForList({
        action: (id, w) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setW1Action(w)
        },
        name: `${prefix}-1D-width`,
    })

    self.setDensityProfile1SenderForList = commander.addSenderForList({
        action: (id, dp1) => {
            self.setNumberVoters(id + 1)
            const voter = voterRegistrar.get(id)
            voter.setDensityProfile1Action(dp1)
        },
        name: `${prefix}-1D-densityProfile`,
    })

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    self.setNumberVotersSender = commander.addSender({
        action: (num) => simAddVoters.setNumberVotersAction(num),
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
    })
    self.setNumberVoters = (num) => {
        commander.loadCommands([self.setNumberVotersSender.command(num)])
    }
}
