export default function TestVoter(viewEntitiesOne) {
    const self = this

    // State //

    self.shape1 = {}
    self.shape2 = {}

    self.setAction = {
        exists(e) {
            self.exists = e
        },
        shape2p(p) {
            self.shape2.x = p.x
            self.shape2.y = p.y
            viewEntitiesOne.testVoteView()
            // todo: maybe add a change
        },
        shape1x(x) {
            self.shape1.x = x
            viewEntitiesOne.testVoteView()
        },
        color(newColor) {
            self.color = newColor
        },
    }

    // Make Commands //

    self.doSetCommand = self.setAction

    // Initialize

    self.doSetCommand.shape1x(0)
    self.doSetCommand.shape2p({ x: 0, y: 0 })
    self.doSetCommand.color('#999')
}
