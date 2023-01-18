export default function Publisher() {
    const self = this

    // Publish to View //
    const observers = []
    self.attach = (observer) => { observers.push(observer) }
    self.update = (simData) => { observers.forEach((o) => o.update(simData)) }
}
