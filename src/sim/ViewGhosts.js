/** @module */

/**
 * @param {Changes} changes
 */
export default function ViewGhosts(changes) {
    const self = this

    self.setShowNonExistingEntities = (a) => {
        self.showGhosts = a
        changes.add(['showGhosts'])
    }
}
