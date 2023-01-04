export default function getGeoms(entities, dimensions) {
    if (dimensions === 1) {
        return entities.map((ent) => (ent.shape1))
    }
    return entities.map((ent) => (ent.shape2))
}
