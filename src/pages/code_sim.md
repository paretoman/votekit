---
title: Sim
layout: default
---

## Model-View Architecture for Voters

* VoterShape is the model of a voter. 
* VoterView is for visualizing the voter. It adds a graphical component.
* VoterShapeList is a list of voterShapes. Use it to add a voterShape.
* VoterViewList is a list of VoterViews. It subscribes to the VoterShapeList to know when to add a voterView.

### Calls

* voterShapeList -> voterShape
* voterShapeList -> voterViewList -> voterView

## Candidates

The same pattern is followed for candidates and candidate distributions.
