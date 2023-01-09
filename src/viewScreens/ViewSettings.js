/** @module */

/**
 * @param {Changes} changes
 */
export default function ViewSettings(changes) {
    const self = this

    self.setShowNonExistingEntities = (a) => {
        self.showGhosts = a
        changes.add(['showGhosts'])
    }
}
