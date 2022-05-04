import CircleGraphic from './CircleGraphic.js'

export default function VoterGraphic(voterShape, screen) {
    const self = this

    const circle = new CircleGraphic(voterShape, 13, screen)
    self.circle = circle

    self.renderForeground = () => {
        // handle
        circle.render()
    }

    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(voterShape)
    }
}
