---
title: ViewScreens
layout: default


---

The viewScreens function aggregates screen functionality.

* Parent page: [view](view.md) 

## ViewScreens

### ScreenCommon

Set height and width. Set option for svg or canvas mode. Set option for showing download links under the screens. Set option for dark mode. This is the model part of a model-view relationship. Buttons are added with other functions.

### screenMain

Display the entities and visualizations in policy space.

### screenMini

Display a sequence of images of policy space at 1/3 size.

### ViewBase

A base class for ViewEntitiesOne and ViewEntitiesSample.

#### ClickDrag

ClickDrag handles mouse interactions with the entities on a screen. Switching modes changes which entities are moved.

### ViewSettings

Store option to show non-existing entities, ghosts.

### ViewEntitiesOne

Draw entities: voters, candidates, test voters.

#### Test Vote

Test votes aren't part of sim. View calls sim's cast vote functions to cast one vote as a test for visualization.

### ViewEntitiesSample

Draw entities: voters, candidates.

### ViewJupyter

Output sim data to jupyter environment for python.

### ViewVizOne

Draw visualization for one election.

### ViewVizSample

Draw visualization for a sampling of elections.

### ViewVizBudget

Draw visualization for budgeting methods in an additional screen.

### ViewDistrictMaps

Visualize districts in an additional screen.

### Viz

Some views call visualizations, viz's.

The viz's for ViewMode state "one" are:

* VizOneVoronoiRanking
* VizOneVoronoi
* VizOneGrid
* VizDistricts

The viz's for ViewMode state "sample" are:

* VizSampleDensity1D
* VizSampleDensity2D
* VizSample

Each of these viz's can have "renderer makers" for the 1D and 2D cases. Maybe in the future this part could be simplified, but it works for now. The idea was to make a renderer function that needed no arguments so it could be run from other functions.