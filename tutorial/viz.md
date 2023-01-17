---
title: Viz
layout: default
---

Some views call visualizations, viz's.

* Parent page: [viewScreens](viewScreens.md)

## Viz

A viz draws voters and sometimes candidate distributions. All have update and render functions.

Input:

* cellData or gridData

Another group of functions, vizEntities, draws the handles for clicking and dragging these entities. 

The viz's for ViewMode state "one" are:

* VizOneVoronoiRanking
* VizOneVoronoi - for votes cast like plurality.
* VizOneGrid - for votes cast like score.
* VizDistricts - for votes cast in districts.

The viz's for ViewMode state "sample" are:

* VizSampleDensity1D/2D
* VizSample

Viz\* calls specialized drawing functions for each viz type:

* DistrictMaps draws the voters in tracts and districts.
* Voronoi1D/2D draws voronoi diagrams.
* Grid1D/2D draws grids of votes.
* VoterRender1D/2D has methods to draw voter shapes outside of any other context.
* VizSampleDensity1D/2D draws density graphs for sampling mode.

Each of these viz's can have "renderer makers" for the 1D and 2D cases. Maybe in the future this part could be simplified, but it works for now. The idea was to make a renderer function that needed no arguments so it could be run from other functions.