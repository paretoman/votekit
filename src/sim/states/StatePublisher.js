export default function StatePublisher() {
    const self = this

    // Publish to View //
    const observers = []
    self.attach = (observer) => { observers.push(observer) }

    self.enter = () => { observers.forEach((o) => o.enter()) }
    self.exit = () => { observers.forEach((o) => o.exit()) }
    self.update = (simData) => { observers.forEach((o) => o.update(simData)) }
    self.render = () => {
        observers.forEach((o) => { if (o.render) o.render() })
    }
    self.renderForeground = () => {
        observers.forEach((o) => { if (o.renderForeground) o.renderForeground() })
    }
    self.clear = () => {
        observers.forEach((o) => { if (o.clear) o.clear() })
    }
    self.clearForeground = () => {
        observers.forEach((o) => { if (o.clearForeground) o.clearForeground() })
    }
}
