export default function simpleCandidate(x, y, votem) {
    // Candidate used for simulation of sampling candidates from a distribution.
    // Just a single point (x,y) is needed.

    votem.newCandidate({ square: { x, y } })
}
