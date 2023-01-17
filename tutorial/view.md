---
title: View
layout: default
---

View sends browser inputs for geometry and election options into the Sim. Browser input includes menus, tooltips, and screens. Also, View displays visualizations of outputs of election results from the Sim. 

* Parent page: [architecture](architecture.md) 
* Subpages: [viewMode](viewMode.md), [viewButtons](viewButtons.md) , [viewScreens](viewScreens.md)

## View

View sets up many views. The views hook into Sim. Then the views receive inputs from the browser and send them to Sim. The views also set up controllers that send inputs from the browser to the Sim. Finally, Sim calls the views' update functions, which draw visualizations. Some views also draw on their own, when they are animating or when there is a test vote.

### ViewMode

Views hook into the Sim through the [ViewMode](viewMode.md). ViewMode has a state. The state calls the views: 

- Sim -> ViewMode -> ViewMode state -> views

### viewChanges

These changes tell the view to update but not the sim.

### Layout

A Layout organizes div components.

## Buttons

The [viewButtons](viewButtons.md) function aggregates button functionality: menu, undo, redo, save, name, add entities.

## Screens

The [viewScreens](viewScreens.md) function aggregates screen functionality.

## Jupyter

The viewJupyter function outputs sim data to the jupyter environment for python.

## Load

Send a configuration to the sim from the browser. The configuration can be in the HTML tag or in the URL. Sim has a default configuration to use if none is provided. Sim.init is called.

## Loop

Update the sim. Draw the foreground.

Updating the sim draws the background visualization and the foreground entities.

The foreground is animated by tweening entities.

The foreground needs to be drawn when animating or when a test vote has happened, which will be listed in viewChanges.

