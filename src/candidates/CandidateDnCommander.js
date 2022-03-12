export default function CandidateDnCommander(candidateDnRegistrar, commander, sim) {
    const self = this

    const prefix = 'candidateDns'

    self.setEClientList = commander.addClientList({
        action: (id, e) => {
            const candidateDn = candidateDnRegistrar.get(id)
            candidateDn.setEAction(e)
        },
        name: `${prefix}-setE`,
    })

    self.setXYClientList = commander.addClientList({
        action: (id, p) => {
            const candidateDn = candidateDnRegistrar.get(id)
            candidateDn.setXYAction(p)
        },
        name: `${prefix}-setXY`,
        props: { isSetXY: true },
    })

    self.setRClientList = commander.addClientList({
        action: (id, r) => {
            const candidateDn = candidateDnRegistrar.get(id)
            candidateDn.setRAction(r)
        },
        name: `${prefix}-setR`,
    })

    // This is kind of weird because this value is not a good measure of the number of entities.
    // An undo will reduce the number stored with the command name,
    // but not reduce the number of entities.
    // So we disable undo.
    self.setNumberCandidateDnsClient = commander.addClient({
        action: (num) => {
            sim.setNumberCandidateDnsAction(num)
        },
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { noUndo: true },
    })
    self.setNumberCandidateDns = self.setNumberCandidateDnsClient.go
}
