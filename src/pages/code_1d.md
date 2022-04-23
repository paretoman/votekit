---
title: 1D
layout: default
---

# 1D Mod
This describes how 1D simulations were added to the 2D simulations.

## New Classes
* SimOne1D is a subclass of SimBase.
* VizOne1D is very similar to VizOne2D.
* Voronoi1D is called by VizOne1D.

## Maybe new in future.
OneDCandidate would be a sibling of CandidateSim but maybe it overwrites renderForeground and instead has render1DForeground.

## Election.js
Election is a component of Sim. So we store the dimensions in Election and can refer to them with a reference to sim.election.

## Fixed bug, geoCensus weight.
Forgot to name gf from geoCensus as weight in pluralityBallot. So now the overlap between census tracts and districts is considered and results are more accurate.

## Set XY
So basically, our commands are only to set p1 and p2. While doing that, we also set x and y. When the user drags an entity, the xy position is sent to the entity, but the xy position is translated into a command that is appropriate for the current dimension.

## Update XY
When the dimensions change, we have to call updateXY to set x and y through the p1 or p2 action. To be clear, this is the action, not the command because we don't need to change the config.

## Line Summer
Just draw midpoints between candidates to define the voronoi cell for each candidate. Then overlay the voter shape on that and find the intersection for each candidate.

## Ballot Dimension
When casting a ballot, we need to know which coordinates to use for the candidates and voters. The summer will be chosen based on the number of dimensions. Only the relevant geometries will be passed to the ballot caster (member of castVotes).

## Election Dimension
The Election class handles deciding what geometry to send to the ballot caster. It will send p1 or p2, if 1D or 2D, respectively.

## ElectionSample
Right now, we're using the same p2 as {x,y}, but in the future, we might have to revisit our choice of variables for rendering points. For example, we might try zooming in.

## Double Sandbox
Right now, the double sandbox doesn't work as desired when working in 2D on one side and 1D on the other. Movements in 1D shouldn't control 2D movements.

## Add Entities
Entities have to be made with 2D and 1D positions, now.