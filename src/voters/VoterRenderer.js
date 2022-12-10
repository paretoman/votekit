export default function VoterRenderer(voterShape) {
    const self = this

    self.voterShape = voterShape

    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(voterShape)
    }
}
