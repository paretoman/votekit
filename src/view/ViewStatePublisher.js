export default function ViewStatePublisher() {
    const self = this

    // Publish to View //
    const observers = []
    self.attach = (observer) => { observers.push(observer) }

    self.enter = () => { observers.forEach((o) => o.enter()) }
    self.exit = () => { observers.forEach((o) => o.exit()) }
    self.update = (e) => { observers.forEach((o) => o.update(e)) }
    self.render = (e) => {
        observers.forEach((o) => { if (o.render) o.render(e) })
    }
    self.renderForeground = (e) => {
        observers.forEach((o) => { if (o.renderForeground) o.renderForeground(e) })
    }
    self.clear = (e) => {
        observers.forEach((o) => { if (o.clear) o.clear(e) })
    }
    self.clearForeground = (e) => {
        observers.forEach((o) => { if (o.clearForeground) o.clearForeground(e) })
    }
}
