---
title: Sim
layout: default
---

Sim is the model. It stores inputs and processes them into outputs. Inputs are spatial election model geometries and election options. Processing is casting votes and applying a social choice function. Outputs are the election results.

* Parent page: [architecture](architecture.md) 

## Sim

1. Commands change Sim and update a configuration.
2. Call sim.update() to get output. The changes are handled. If there are no changes, then there is no output. 
3. An update mode is entered. There are different update modes: one and sample. One does one election and gets one result. Sample does a sampling of many elections to get a distribution of results.
4. Any election options that depend on other options are updated.
5. Districts are updated if they need to be.
6. The geometry of the problem is assembled into a data structure.
7. An election is run on the geometry.
8. If there are districts, then the geometry is run in several tracts, each with slight variations in geometry.
9. Votes are cast.
10. If there are districts, then votes from tracts are combined into districts.
11. A social choice function runs on the votes to determine winners.
12. Election results are assembled.
13. If this is a single election, then all the options, geometry, votes, and social choice outputs are combined into an electionResults data structure.
14. If this is a sampling mode, then additional elections are performed in batches. Each sim.update() call generates the next batch of winners and combines them into a total set of winners as the samplingResult data structure.
15. These data structures are passed to View. Specifically, 
