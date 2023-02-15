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

The sampling seed can either be constant or random. Setting the seed to random means every time the sampler starts, it will choose a random sampling seed. 

The seed is used to sample the same candidates each time, no matter if the other settings change. The only way things would be different is if the size of the candidate distributions change or if the number of candidate distributions change. Even if the size of the candidate distributions change, the same candidates will be sampled relative to the center. If the number of candidate distributions change, then there will be correlations, though complex.



