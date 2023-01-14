export default function VoterTest(viewEntitiesOne) {
    const self = this

    // Position

    self.shape1 = {}
    self.shape2 = {}

    self.setAction = {}
    self.setAction.exists = (e) => {
        self.exists = e
    }
    self.setE = (e) => {
        self.setAction.exists(e)
    }

    self.setAction.shape2p = (p) => {
        self.shape2.x = p.x
        self.shape2.y = p.y
        // todo: maybe add a change
    }
    self.setAction.shape1x = (p) => {
        self.shape1.x = p
    }
    self.setXY1 = (p) => {
        self.setAction.shape1x(p.x)
        viewEntitiesOne.testVoteView()
    }
    self.setXY2 = (p) => {
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
    self.setColor = (e) => {
        self.setAction.color(e)
    }
}
