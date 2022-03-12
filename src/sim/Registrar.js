/**
 * @constructor - Gives an id to an entity.
 */
export default function Registrar() {
    const self = this

    const entities = []
    let nextID = 0

    self.new = function (entity) {
        entities.push(entity)
        const id = nextID
        nextID += 1
        return id
    }
    self.num = () => nextID
    self.get = (id) => entities[id]
}
