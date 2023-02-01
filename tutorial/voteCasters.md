---
title: VoteCasters
layout: default
---

VoteCasters: Votes are cast.

* Parent Page: [Election](election.md)

## VoteCasters

* Voter geometries cast their votes. 
* A distribution of a population of voters is integrated. A 2D spatial model is used to make the decision of how to vote or who to vote for. 
* The vote is aggregated into a set that contains the information needed to elect winners, to explain, and to visualize.
* There are two ways to cast.
  1. By voter.
  2. By regions of voters. This is more complicated.
* The "votes" data structure is described below.

## Votes

Some of the following is output from a vote caster.

* for socialChoiceMethods
  * voteFractions - the fraction of the population with a preference.
  * List of votes:
    * scoreVotes - a list of votes. Each vote has a score for each candidate.
    * rankingVotes - a list of votes. Each vote has a rank for each candidate.
    * cansByRank - a list of votes. Each vote is a list indexed by ranking. A list of candidates is at each ranking.
  * preComputedTallies:
    * tallyFractions - a number for each candidate.
    * pairwiseTallyFractions - a fraction for each pair of candidates.
* for viz
  * parts of votesForGeom:
      * { ranking, cells }
      * { ranking, intervalBorders }
      * { grid, voteSet, voterGeom }

  
  