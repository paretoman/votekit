export default function CandidateDnRenderer(candidateDn) {
    const self = this

    self.canDn = candidateDn

    self.setRenderer = (rendererMaker) => {
        self.renderer = rendererMaker(candidateDn)
    }
}
