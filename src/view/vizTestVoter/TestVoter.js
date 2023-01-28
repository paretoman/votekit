export default function TestVoter(viewEntitiesOne) {
    const self = this

    // Position

    self.shape1 = {}
    self.shape2 = {}

    self.setAction = {}
    self.setCommand = {}
    self.setAction.exists = (e) => {
        self.exists = e
    }
    self.setCommand.exists = (e) => {
        self.setAction.exists(e)
    }

    self.setAction.shape2p = (p) => {
        self.shape2.x = p.x
        self.shape2.y = p.y
        // todo: maybe add a change
    }
    self.setAction.shape1x = (x) => {
        self.shape1.x = x
    }
    self.setCommand.shape1x = (x) => {
        self.setAction.shape1x(x)
        viewEntitiesOne.testVoteView()
    }
    self.setCommand.shape2p = (p) => {
        self.setAction.shape2p(p)
        viewEntitiesOne.testVoteView()
    }

    // Initialize

    self.setAction.shape1x(0)
    self.setAction.shape2p({ x: 0, y: 0 })

    self.color = '#999'

    self.setAction.color = (newColor) => {
        self.color = newColor
    }
    self.setCommand.color = (e) => {
        self.setAction.color(e)
    }
}
