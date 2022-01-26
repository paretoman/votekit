export default function plurality(votes) {

    // the candidate with the highest tally wins
 
    const max = Math.max(...votes.tallyFractions);
    const iWinner = votes.tallyFractions.indexOf(max);

    let results = {iWinner}
    return results   
}