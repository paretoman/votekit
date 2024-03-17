import { range } from '@paretoman/votekit-utilities'
import getGeoms from './getGeoms.js'
import getPoints from './getPoints.js'

/** A component of sim.js that deals with adding candidates. */
export default function EntityList(commander, prefix, registrar) {
    const self = this

    // Publish //

    const observers = []
    self.attachNewE = (observer) => { observers.push(observer) }
    const updateObservers = (e) => { observers.forEach((o) => o.updateNewE(e)) }

    // Add Entity //

    self.addEntity = (entity) => {
        updateObservers(entity)

        const num = registrar.num()
        self.setNumberEntities(num)
    }
    self.addEntityPressed = () => {
        // really, we want to make a command to set numEntities to at least an amount
        const num = registrar.num() + 1
        self.setNumberEntities(num)
    }
    self.setNumberEntities = commander.addSender({
        currentValue: 0,
        name: `${prefix}-setNumberAtLeast`,
        props: { isFirstAction: true },
        action: (num) => {
            while (registrar.num() < num) {
                self.addDefaultEntity()
            }
        },
        // load has no Undo. We can't undo creating an entity.
        // We just set entity.exists to false.
    }).load

    // Getters //

    self.getEntities = () => registrar.getList().filter((c) => c.exists)
    self.getGeoms = (dimensions) => getGeoms(self.getEntities(), dimensions)
    self.getPoints = (dimensions) => getPoints(self.getEntities(), dimensions)
}
