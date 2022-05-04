import SquareGraphic from './SquareGraphic.js'

export default function CandidateDnGraphic(candidateDn, screen) {
    const self = this

    const square = new SquareGraphic(candidateDn, 21, 21, screen) // square is for rendering
    self.square = square

    self.renderForeground = () => {
        square.render()
    }
    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(candidateDn)
    }
}
