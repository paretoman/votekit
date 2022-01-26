export default function SimpleCandidate(x,y,votem) {
    // Candidate used for simulation of sampling candidates from a distribution. Just a single point (x,y) is needed.
    
    let self = this

    self.square = {x:x,y:y}

    votem.newCandidate(self)

}
