export default function CandidateCommander(candidateRegistrar, commander, sim) {
    const self = this

    const prefix = 'candidates'

    self.setEClientList = commander.addClientList({
        action: (id, e) => {
            const candidate = candidateRegistrar.get(id)
            candidate.setEAction(e)
        },
        name: `${prefix}-setE`,
    })

    self.setXYClientList = commander.addClientList({
        action: (id, p) => {
            const candidate = candidateRegistrar.get(id)
            candidate.setXYAction(p)
        },
        name: `${prefix}-setXY`,
        props: { isSetXY: true },
    })

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    self.setNumberCandidatesClient = commander.addClient({
        action: (num) => {
            sim.setNumberCandidatesAction(num)
        },
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { noUndo: true },
    })
    self.setNumberCandidates = self.setNumberCandidatesClient.go
}
