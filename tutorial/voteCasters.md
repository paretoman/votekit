---
title: VoteCasters
layout: default
---

VoteCasters: Votes are cast.

* Parent Page: [Election](election.md)

## VoteCasters

* Voter geometries cast their votes. 
* A density of a population of voters is summed. A 2D spatial model is used to make the decision of how to vote or who to vote for. 
* The vote is aggregated into a set that contains the information needed to elect, explain, and visualize.
* There are two ways to cast.
  1. By points.
  2. By regions. This is more complicated.
* The "votes" data structure is described below.

## Preferences

These are the three ways to state a preference.

* Plurality: a choice of a candidate.
* Scores: a score for each candidate.
* Ranking: a rank for each candidate. No rankings are skipped. Equal ranks allowed.

Preferences are stored in the following ways:

* Plurality
  * pluralityVote: a candidate, the index of the candidate.
  * There is no "pluralityVotes" list of preferences because it isn't needed. It would be an identity matrix.
* Scores
  * scoreVote: a score for each candidate, any number, Number[].
    * Right now, we're just using scores between 0 to 1. In the future, scores above 1 might be used.
  * scoreVotes: an list of scoreVote preferences, Number[][]. Each preference haas a score for each candidate.
* Ranking
  * ranking: a rank for each candidate, Number[]. 0 is the best ranking, then 1, 2, etc.
  * rankings: a list of preferences. Each is a list with a rank for each candidate. Number[][]. 0 is the best ranking, then 1, 2, etc.
  * cansByRankList: a list of preferences. Each is a list indexed by rank. Each entry is a list of candidates at that ranking. Candidates are represented by index. Number[][][].

## Votes

Some of the following is output from a vote caster as the "votes" data structure.

* for socialChoiceMethods
  * Lists of preferences:
    * scoreVotes - Each preference has a score for each candidate.
    * rankings - Each preference has a rank for each candidate.
    * cansByRankList - Each preference is a list indexed by ranking. A list of candidates is at each ranking.
    * Note that there is no "pluralityVotes" list of preferences because it isn't needed. It would be an identity matrix.
  * Counting preferences
    * voteFractions - the fraction of the population with a preference.
  * preComputedTallies:
    * tallyFractions - a number for each candidate.
    * pairwiseTallyFractions - a fraction for each pair of candidates.
* for viz
  * parts of votesForGeom:
      * { ranking, cells }
      * { ranking, intervalBorders }
      * { grid, voteSet, voterGeom }

  
  