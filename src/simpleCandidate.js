export default function simpleCandidate(x, y, election) {
    // Candidate used for simulation of sampling candidates from a distribution.
    // Just a single point (x,y) is needed.

    election.newCandidate({ x, y })
}
