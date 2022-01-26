import Handle from './Handle.js'

export default function SimVoterCircle(x, y, r ,screen,dragm,votem) {
    // VoterCircle for simulations of many candidates
    // VoterCircle class with Handle component to take care of dragging.

    let self = this

    self.r = r

    let handle = new Handle(x, y, screen,dragm)
    self.handle = handle

    votem.newVoterGroup(self)
    
    self.update = function() {
    }
    
    // Graphics component
    self.render = function() {
        let ctx = screen.ctx
        // circle
        ctx.beginPath()
        ctx.fillStyle = "#eee"
        ctx.arc(handle.x, handle.y, self.r, 0, 2*3.14159)
        ctx.fill()
        ctx.stroke()
        
        // handle
        handle.render()
    }

}