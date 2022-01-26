import Handle from './Handle.js'
import VoronoiGroup from "./VoronoiGroup.js"

export default function VoterCircle(x, y, r ,screen,dragm,votem) {
    // VoterCircle class with Handle component to take care of dragging. VoronoiGroup component takes care of drawing votes.

    let self = this

    self.r = r

    let handle = new Handle(x, y, screen,dragm)
    self.handle = handle

    votem.newVoterGroup(self)
    
    let voronoiGroup = new VoronoiGroup(votem,self,screen)

    self.update = function() {
        voronoiGroup.update()
    }
    
    // Graphics component
    self.render = function() {
        // circle
        voronoiGroup.render()
        // handle
        handle.render()
    }

}