export default function EntityGraphic(entity, simOptions) {
    const self = this

    // View sets model
    self.setXYView = (p) => {
        const { dimensions } = simOptions
        if (dimensions === 1) {
            entity.doSetCommand.shape1x(p.x)
        } else {
            entity.doSetCommand.shape2p(p)
        }
        self.updateViewXY()
    }

    /** Model sets view position when entering a view mode */
    self.updateViewXY = () => {
        const { dimensions } = simOptions
        if (dimensions === 1) {
            self.x = entity.shape1.x
            self.y = 250
        } else {
            self.x = entity.shape2.x
            self.y = entity.shape2.y
        }
    }
}
