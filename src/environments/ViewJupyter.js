import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function ViewJupyter(sim, viewSM, changes) {
    const self = this

    viewSM.views.one.pub.attach(self)
    viewSM.views.sample.pub.attach(self)

    self.enter = () => {}
    self.exit = () => {}

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate({ electionResults })
    }
}
