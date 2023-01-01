/** @module */

import { jcopy } from '../utilities/jsHelpers.js'

/**
 * keep track of changes that occur to a simulation's configuration.
 * @constructor
 */
export default function Changes() {
    const self = this

    const changes = ['init']

    self.add = (changeList) => {
        changeList.forEach(
            (c) => changes.push(c),
        )
    }
    self.check = (changeList) => {
        let n = 0
        changeList.forEach(
            (c) => { n += changes.includes(c) ? 1 : 0 },
        )
        return n > 0
    }
    self.checkNone = () => (changes.length === 0)
    self.checkAny = () => (changes.length !== 0)
    self.clear = () => {
        changes.splice(0, changes.length)
    }
    self.numChanges = () => changes.length
    self.getChanges = () => jcopy(changes) // debugging
}
