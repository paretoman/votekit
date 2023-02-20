export default function getPoints(entities, dimensions) {
    if (dimensions === 1) {
        return entities.map((ent) => (ent.shape1.x))
    }
    return entities.map((ent) => ([ent.shape2.x, ent.shape2.y]))
}
