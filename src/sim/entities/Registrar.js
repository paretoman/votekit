/**
 * @constructor - Gives an id to an entity.
 */
export default function Registrar() {
    const self = this

    let nextID = 0

    self.new = function () {
        const id = nextID
        nextID += 1
        return id
    }
}
