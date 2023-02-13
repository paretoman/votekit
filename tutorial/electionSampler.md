---
title: ElectionSampler
layout: default
---

An ElectionSampler is run on the geometry to generate output data structures.

- Parent Pages: [SimMode](simMode.md), [election](election.md)

## ElectionSampler

The ElectionSampler does a lot of the work of simModeSample.

The function sampleElection takes care of running multiple [elections](election.md) in batches. The sampleElection function returns the winning candidate positions and parties. There is more data in electionResults, but it isn't used by sampleElection.

ElectionSampler is in charge of deciding when to add points. It keeps track of how many points it has generated at the current settings. It also keeps track of how many wins each party has had and calculates a fraction.

Visualization functions receive the new batches of points and store them for display:

* VizSample
* VizSampleDensity1D
* VizSampleDensity2D