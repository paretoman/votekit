import PhaseOptionsMan from './PhaseOptionsMan.js'

export default function SequenceOptionsMan(changes, commander) {
    const self = this

    self.sequences = {
        general: {
            phases: {
                general: new PhaseOptionsMan('general', 'general', changes, commander),
            },
        },
        closedPrimary: {
            phases: {
                closedPrimary: new PhaseOptionsMan('closedPrimary', 'closedPrimary', changes, commander),
                general: new PhaseOptionsMan('closedPrimary', 'general', changes, commander),
            },
        },
        nonpartisanOpenPrimary: {
            phases: {
                nonpartisanOpenPrimary: new PhaseOptionsMan('nonpartisanOpenPrimary', 'nonpartisanOpenPrimary', changes, commander),
                general: new PhaseOptionsMan('nonpartisanOpenPrimary', 'general', changes, commander),
            },
        },
    }

    self.finalPhaseBySequence = {
        general: 'general',
        closedPrimary: 'general',
        nonpartisanOpenPrimary: 'general',
    }

    const phaseOptionsManList = []
    Object.keys(self.sequences).forEach((sequenceName) => {
        const { phases } = self.sequences[sequenceName]
        Object.keys(phases).forEach((phaseName) => {
            phaseOptionsManList.push(phases[phaseName])
        })
    })

    const sequenceOptions = {}

    self.init = () => {
        self.setSequenceName('general')
        phaseOptionsManList.forEach((phaseOptionsMan) => {
            phaseOptionsMan.init()
        })
    }

    self.setSequenceName = commander.addSender({
        name: 'sequenceName',
        currentValue: sequenceOptions.sequenceName,
        action(n) {
            sequenceOptions.sequenceName = n
            changes.add(['sequenceName'])
        },
    }).go

    self.update = () => {
        phaseOptionsManList.forEach((phaseOptionsMan) => {
            phaseOptionsMan.update()
        })
    }
    self.getOptions = () => {
        const s = { ...sequenceOptions }
        s.sequences = {}
        Object.keys(self.sequences).forEach((sequenceName) => {
            s.sequences[sequenceName] = { phases: {} }
            const { phases } = self.sequences[sequenceName]
            Object.keys(phases).forEach((phaseName) => {
                s.sequences[sequenceName].phases[phaseName] = self.sequences[sequenceName].phases[phaseName].getOptions()
            })
        })
        return s
    }
}
