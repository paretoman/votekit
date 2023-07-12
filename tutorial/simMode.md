---
title: SimMode
layout: default
---

SimMode is where the election happens and handles the processing of inputs geometries, options, and changes to output data structures.

- Parent Page: [Sim](sim.md)
- Subpages: [ElectionSampler](electionSampler.md), [Sequence](sequence.md)

## SimMode

SimMode has the following states: SimModeOne and SimModeSample. Each state is like a different game.
- SimModeOne does one election sequence and gets one result: {sequenceResults}
- SimModeSample does a sampling of many elections to get a distribution of results: {samplingResults}

Here's a synopsis of both SimModeOne and SimModeSample:

- Call update() method of the mode to get output. 
- The Sim checks if there are any changes and that controls the flow. If there are no changes, then there is no output. 
- Any election options that depend on other options are updated.
- Districts are updated if they need to be.
- The geometry of the problem is assembled into a data structure.
- For SimModeOne, an election [sequence](sequence.md) is run on the geometry to generate output data structures.
- For SimModeSample, an [ElectionSampler](electionSampler.md) is run, which then calls election [sequence](sequence.md) multiple times.
- These data structures are passed to View. Specifically, SimMode passes its results to ViewMode's update method to visualize results.