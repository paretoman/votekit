import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function JupyterView(sim, changes) {
    const self = this

    sim.attach(self)

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate({ electionResults })
    }
}
