import jupyterUpdate, { jupyterClear } from './jupyter.js'

export default function ViewJupyter(sim, view, changes) {
    const self = this

    view.views.one.pub.attach(self)
    view.views.sample.pub.attach(self)

    self.enter = () => {}
    self.exit = () => {}

    self.update = (electionResults) => {
        if (changes.checkNone()) return

        jupyterClear()
        jupyterUpdate({ electionResults })
    }
}
