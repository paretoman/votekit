export default function EntityGraphic(entity, screen, election) {
    const self = this

    // View sets model
    self.setXYView = (p) => {
        entity.setXY(p)
        self.updateViewXY()
    }

    /** Model sets view position when entering a view state */
    self.updateViewXY = () => {
        if (election.dimensions === 1) {
            self.x = entity.shape1.x
            self.y = 250
        } else {
            self.x = entity.shape2.x
            self.y = entity.shape2.y
        }
    }
}
