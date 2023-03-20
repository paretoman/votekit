import PhaseOptionsMan from './PhaseOptionsMan.js'

export default function SequenceOptionsMan(changes, commander) {
    const self = this

    self.phaseOptionsManList = {
        general: new PhaseOptionsMan(changes, commander),
        // More to come.
    }
    const phases = Object.keys(self.phaseOptionsManList)

    const sequenceOptions = {
        sequenceName: 'general',
        phases: {},
    }
    self.init = () => {
        phases.forEach((phase) => {
            self.phaseOptionsManList[phase].init()
        })
    }
    self.update = () => {
        phases.forEach((phase) => {
            self.phaseOptionsManList[phase].update()
        })
    }
    self.getOptions = () => {
        const s = { ...sequenceOptions }
        phases.forEach((phase) => {
            s.phases[phase] = self.phaseOptionsManList[phase].getOptions()
        })
        return s
    }
}
