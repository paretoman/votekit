---
title: Issues
layout: default
---

Here's a big list of things I want in the future.

* Parent Page: [index](index.md)

## Bugs

* Architecture.md document needs to be updated to match code.
* Need to allow other strategies when casting vote. Perhaps judging on a universal scale is a strategy in some situation. Definitely need to consider polls.
* Simpler intro example with just one voter shape for both 1D and 2D, and different candidate positions for 1D.
* Tooltip text gets selected sometimes.

## UI

* Use React, or Vue, or something rather than custom buttons.

## Election Model

* Gaussian voters

## Visuals

* Animate +1 rising from candidate when they become winner.
* [x] Budget charts. For MES, show budget being spent in each round. 
  * [ ] Also, maybe also show comparisons between candidates in each round.
* We should not be using an object oriented approach like passing VoterViewList and CandidateViewList to a viz function. It's too confusing and it seems to cross the boundary between simulation model and visualization. We should instead pass data to a viz function.

## Organizing Code

* [x] Make test directory outside of src. maybe also put index.html there too, since that is the test I run when developing the code.