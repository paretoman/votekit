---
title: ViewMode
layout: default
---

Views hook into the Sim through the ViewMode.

* Parent page: [view](view.md) 

## ViewMode

A ViewMode attaches to Sim. ViewMode follows a state pattern. That means Sim calls update for ViewMode, and then ViewMode calls update for a ViewMode state. There are two states: one and sample. ViewMode is actually a state machine, so each state has enter and exit functions as well. Each state is simply a publisher for ViewMode. The views attach to these publishers. 

updates: 

- Sim -> ViewMode -> ViewMode state -> views -> viz's

attach: 

- Sim <- ViewMode
- ViewMode state <- views

The views that attach this way are: 

* Buttons
  * CandidateAddMakeButton
  * CandidateDnAddMakeButton
* Screens
  * ViewDistrictMaps
  * ViewEntitiesOne
  * ViewEntitiesSample
  * ViewVizBudget
  * ViewVizOne
  * ViewVizSample

Other views don't attach to a mode. They connect to Sim in other ways.