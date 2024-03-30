---
title: Program Flow Dragging a Voter
layout: default
---

todo: update

Here are some call stacks to illustrate what happens when the user moves a voter shape.

Mouse Move to Config change.

ConfigKeeper.self.execute (command\ConfigKeeper.js:53)
Commander.self.execute (command\Commander.js:90)
History.self.passDo (command\History.js:28)
<anonymous> (command\ComMessenger.js:27)
broadcastDo (command\ComMessenger.js:27)
Commander.self.do (command\Commander.js:120)
go (command\CommandStore.js:50)
VoterShape.self.setXY (voters\VoterShape.js:94)
move (ui\ClickDrag.js:75)
Screen.self.wrap.onmousemove (ui\Screen.js:149)

Mouse Move to Sim change.

VoterShape.self.setAction.shape2p (voters\VoterShape.js:72)
action (voters\VoterCommander.js:25)
CommandStore.self.execute (command\CommandStore.js:63)
Commander.self.execute (command\Commander.js:91)
History.self.passDo (command\History.js:28)
<anonymous> (command\ComMessenger.js:27)
broadcastDo (command\ComMessenger.js:27)
Commander.self.do (command\Commander.js:120)
go (command\CommandStore.js:50)
VoterShape.self.setXY (voters\VoterShape.js:94)
move (ui\ClickDrag.js:75)
Screen.self.wrap.onmousemove (ui\Screen.js:149)

In summary, the mouse move tells the VoterShape to move. VoterShape asks the Commander to call it back to move the shape. Commander passes the message along to ComMessenger. Commessenger calls back to Commander. Commander calls back to VoterShape.

Now, we still have to run the election and draw the visuals. That only happens when we get to the next animation frame.

First we get to the vote casting phase, which for plurality is just finding the area of a geometric shape.

sumCircle (voteCasters\CastPluralitySummer2DQuadrature.js:113)
sumArea (voteCasters\CastPluralitySummer2DQuadrature.js:23)
<anonymous> (voteCasters\castPlurality.js:25)
castPlurality (voteCasters\castPlurality.js:24)
Election.self.voteCasters (election\Election.js:64)
Election.self.runElection (election\Election.js:52)
ElectionOne.self.runElectionSim (election\ElectionOne.js:27)
SimModeOne.self.update (sim\states\SimModeOne.js:38)
Sim.self.update (sim\Sim.js:76)
update (ui\sandbox.js:89)
gameLoop (ui\sandbox.js:83)
requestAnimationFrame (Unknown Source:0)

Then we get to the counting of the votes, which is easy for plurality.

plurality (socialChoiceMethods\plurality.js:14)
SocialChoice.self.run (election\SocialChoice.js:39)
Election.self.runElection (election\Election.js:53)
ElectionOne.self.runElectionSim (election\ElectionOne.js:27)
SimModeOne.self.update (sim\states\SimModeOne.js:38)
Sim.self.update (sim\Sim.js:76)
update (ui\sandbox.js:89)
gameLoop (ui\sandbox.js:83)
requestAnimationFrame (Unknown Source:0)
gameLoop (ui\sandbox.js:85)
requestAnimationFrame (Unknown Source:0)

The sim passes the election results to the View. The View then calculates the voronoi shapes that plurality uses. This is the View's update step.

voronoi (lib\snowpack\build\snowpack\pkg\d3-delaunay.js:1227)
Voronoi2D.self.update (viz\Voronoi2D.js:28)
<anonymous> (voters\VoterViewList.js:50)
VoterViewList.self.updateGraphic (voters\VoterViewList.js:50)
VizOneVoronoi.self.update (viz\VizOneVoronoi.js:36)
ViewEntitiesOne.self.update (sim\states\ViewEntitiesOne.js:92)
View.self.update (sim\View.js:50)
<anonymous> (sim\Sim.js:58)
updateObservers (sim\Sim.js:58)
Sim.self.update (sim\Sim.js:78)
update (ui\sandbox.js:89)
gameLoop (ui\sandbox.js:83)
requestAnimationFrame (Unknown Source:0)

Then the view update step then also renders the diagram.

Voronoi2D.self.render (viz\Voronoi2D.js:32)
<anonymous> (voters\VoterViewList.js:58)
VoterViewList.self.render (voters\VoterViewList.js:58)
VizOneVoronoi.self.render (viz\VizOneVoronoi.js:40)
ViewEntitiesOne.self.render (sim\states\ViewEntitiesOne.js:109)
ViewEntitiesOne.self.update (sim\states\ViewEntitiesOne.js:99)
View.self.update (sim\View.js:50)
<anonymous> (sim\Sim.js:58)
updateObservers (sim\Sim.js:58)
Sim.self.update (sim\Sim.js:78)
update (ui\sandbox.js:89)
gameLoop (ui\sandbox.js:83)
requestAnimationFrame (Unknown Source:0)

The foreground is drawn on every animation frame.

CircleGraphic.self.render (vizEntities\CircleGraphic.js:37)
VoterGraphic.self.renderForeground (vizEntities\VoterGraphic.js:12)
<anonymous> (voters\VoterViewList.js:68)
VoterViewList.self.renderForegroundExisting (voters\VoterViewList.js:68)
VoterViewList.self.renderForeground (voters\VoterViewList.js:64)
ViewEntitiesOne.self.renderForeground (sim\states\ViewEntitiesOne.js:113)
View.self.renderForeground (sim\View.js:52)
drawForeground (ui\sandbox.js:95)
gameLoop (ui\sandbox.js:84)
requestAnimationFrame (Unknown Source:0)