import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function ViewJupyter(sim, changes) {
    const self = this

    sim.attach(self)

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate({ electionResults })
    }
}
