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

    self.setCommand = self.setAction

    // Initialize

    self.setCommand.shape1x(0)
    self.setCommand.shape2p({ x: 0, y: 0 })
    self.setCommand.color('#999')
}
