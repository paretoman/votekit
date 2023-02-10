---
title: VoteCasters
layout: default
---

VoteCasters: Votes are cast.

* Parent Page: [Election](election.md)

## VoteCasters

* Voter geometries cast their votes. 
* A density of a population of voters is summed. A 1D or 2D spatial model is used to make the decision of how to vote or who to vote for. 
* The vote is aggregated into a set that contains the information needed to elect, explain, and visualize.
* There are two ways to cast.
  1. By points.
  2. By regions. This is more complicated.
* The "votes" output data structure is described below. You can skip to that part.

## Preferences

### A single Preference

These are the three ways to state a preference.

* Plurality: a choice of a candidate.
* Scores: a score for each candidate. 
* Ranking: a rank for each candidate.  

A preference is stored as data in the following ways:

* Plurality
  * pluralityVote: the chosen candidate. 
    * A candidate is represented as an integer from 0 to a max. The max is the number of candidates minus 1.
    * type: Number
* Scores
  * scoreVote: an array of scores, indexed by candidate. 
    * A score is a number between 0 and 1. In the future, maybe integers between 0 and a maximum score.
    * type: Number[], Number array
    * length: number of candidates
* Ranking
  * ranking: an array of ranks, indexed by candidate. 
    * A rank of 0 is the best ranking, then 1, 2, and so on. No rankings are skipped, but skipping is allowed. Equal ranks are allowed.
    * type: Number[], Number array
    * length: number of candidates
  * cansByRank: an array of candidates lists, indexed by rank. Candidates can share a rank. Number[][][].

### Preference Lists

* Plurality
  * There is no "pluralityVotes" list of preferences because it isn't needed.
* Scores
  * scoreVotes: a list of scoreVote preferences, Number[][]. Each preference has a score for each candidate.
* Ranking
  * rankings: a list of preferences. Each preference has a rank for each candidate. Number[][]. 0 is the best ranking, then 1, 2, etc.
  * cansByRankList: a list of preferences. Each preference is a list indexed by rank. Each entry is a list of candidates at that ranking. Candidates are represented by index. Number[][][].


## Counting

Ways to say how many votes.

* area: number of pixels.
* density: votes per pixel. From 0 to 1.
* voteCount: a number of votes.
* totalVotes: total number of votes.
* All of these are non-negative real numbers.

### Preference Tallies

Preference tallies tell how many votes have a listed preference.

* voteCounts: a list of numbers of votes for a list of preferences.
  * Also used for "grid" of votes.
* voteFractions: a list of fractions for a list of preferences. voteCounts as a fraction of the total number of votes.  From 0 to 1.

### Candidate Tallies

Candidate tallies are just tallies indexed by candidate. This is a way to combine preferences. We have defined tallies for each type of preference:

* plurality
  * countByCan: The number of plurality votes for a candidate.
  * voteFractionByCan: The fraction of plurality votes for a candidate.
  
* score
  * scoreSumByCan: number of votes times score, summed for each candidate.
  * scoreAverageByCan: average score for each candidate. = scoreSumByCan / totalVotes. number of votes times score divided by max score, summed for each candidate. (not used)
  * scoreFractionAverageByCan: average fractional score for each candidate.
  
* ranking
  * bordaScores: The borda scores for each candidate for one vote.
  * bordaFractions: Fractional borda scores, between 0 and 1.
  * bordaScoreSumByCan: sum of borda scores for a candidate.
  * bordaFractionSumByCan: The sum of fractional borda scores for a candidate. (not used)
  * bordaFractionAverageByCan: The average fractional borda score for a candidate.
  * firstPreferences: a sum of ranking votes for each candidate, counting the vote only by the first preference.
  

Outside of voteCasters, we sometimes use a loosely defined tally. It changes its definition depending on the type of vote.

* tallyFractions: A general term that should only be used when we don't need to know what type of vote was being used but instead just want to give each candidate a number between 0 and 1.

* Uses of tallyFractions
  * tooltip uses tallyFractions and ranking
  * TestVoterGraphic uses tallyFractions
  * A general representation of a vote as a vector.

### Pairwise Tallies

Pairwise tallies are indexed by a pair of candidates. The winning candidate is first and the losing candidate is second. This is another way to combine preferences.

* ranking
  * winsPairwise: The number of wins for the first of a pair of candidates.
  * winFractionPairwise: The fraction of wins for the first of a pair of candidates.

## Votes

Some of the following object is output from a vote caster as the "votes" data structure.

* preferencesLists:
  * scoreVotes - Each preference has a score for each candidate.
  * rankings - Each preference has a rank for each candidate.
  * cansByRankList - Each preference is a list indexed by ranking. A list of candidates is at each ranking.
  * There is no "pluralityVotes" list of preferences because it isn't needed. It would be an identity matrix.  
* preferenceTallies:
  * voteFractions - the fraction of the population with a preference.
* candidateTallies:
  * voteFractionsByCan - the fraction of plurality votes for each candidate.
  * scoreFractionAverageByCan - the average fractional score for each candidate.
  * firstPreferenceFractions - a list of fractions of voters who ranked a candidate first, indexed by candidate.
* pairwiseTallies:
  * winFractionPairwise - the fraction of wins for the first of a pair of candidates.
* votesByGeom:
  * Vote data for each voter geometry. A list of votesForGeom. 
  * votesForGeom: Vote data for just one voter geometry. votesForGeom parts may include one of the following, depending on the vote caster:
    * { ranking, cells }
    * { ranking, intervalBorders }
    * { grid, voteSet, voterGeom }  
* parties: { partiesByCan, numParties }
  