import Handle from './Handle.js'
import VoronoiGroup from "./VoronoiGroup.js"

export default function VoterCircle(x, y, r ,screen,dragm,votem) {
    // VoterCircle class with Handle component to take care of dragging. VoronoiGroup component takes care of drawing votes.

    let self = this

    self.r = r

    let drawMode = "votes"

    let handle = new Handle(x, y, screen,dragm)
    self.handle = handle

    let ctx = screen.ctx

    votem.newVoterGroup(self)
    
    let voronoiGroup = new VoronoiGroup(votem,self,screen)

    self.update = function() {
        if (drawMode === "votes") {
            voronoiGroup.update()
        }
    }
    
    // Graphics component
    self.render = function() {
        // circle
        if (drawMode === "votes") {
            voronoiGroup.render()
        } else {
            ctx.beginPath()
            ctx.fillStyle = "grey"
            ctx.arc(handle.x, handle.y, self.r, 0, 2*3.14159)
            ctx.fill()
            ctx.stroke()
        }
        
        // handle
        handle.render()
    }

}