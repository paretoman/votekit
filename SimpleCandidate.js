export default function SimpleCandidate(x,y,votem) {
    // Candidate class on top of square. Candidate adds candidate behavior on top of a draggable square handle.
    
    let self = this

    self.square = {x:x,y:y}

    votem.newCandidate(self)

}
