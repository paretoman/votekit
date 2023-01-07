/** @module */

import ViewStatePublisher from './ViewStatePublisher.js'

/**
 *
 */
export default function ViewState(simState) {
    const self = this

    simState.pub.attach(self)

    self.pub = new ViewStatePublisher()

    self.enter = () => { self.pub.enter() }
    self.exit = () => { self.pub.exit() }
    self.update = (simData) => { self.pub.update(simData) }
    self.render = () => { self.pub.render() }
    self.renderForeground = () => { self.pub.renderForeground() }
    self.clear = () => { self.pub.clear() }
    self.clearForeground = () => { self.pub.clearForeground() }
}
