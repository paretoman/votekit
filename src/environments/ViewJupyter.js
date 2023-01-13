import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function ViewJupyter(viewSM, changes) {
    const self = this

    viewSM.views.one.attach(self)
    viewSM.views.sample.attach(self)

    self.enter = () => {}
    self.exit = () => {}

    self.update = (simData) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate(simData)
    }
}
