---
title: ElectionSampler
layout: default
---

An ElectionSampler is run on the geometry to generate output data structures.

- Parent Pages: [SimMode](simMode.md), [election](election.md)

## ElectionSampler

The ElectionSampler does a lot of the work of simModeSample. It runs multiple [elections](election.md). A distribution of winners is recorded. The only variables measured are position and party.

Additional elections are performed in batches. Each electionSampler.update() call generates the next batch of winners and combines them into a total set of winners as the samplingResult data structure.