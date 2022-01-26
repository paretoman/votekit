
export default function CandidateDistributionSampler(candidateDistributions) {
    let self = this
    let cdf = getCDF(candidateDistributions) 
    self.samplePoint = function() {
        return samplePoint1(candidateDistributions,cdf)
    }
}

function samplePoint1(candidateDistributions,cumulativeProbabilityOfDistribution) {
        // pick a voter distribution
        let iDist = randomDistribution(cumulativeProbabilityOfDistribution)
        let cd = candidateDistributions[iDist]
        // sample circle
        let point = randomInsideCircle( cd.square.x , cd.square.y , cd.r )
        return point
}

function randomDistribution(cumulativeProbabilityOfDistribution) {

    // sample from distribution
    // pick a random number from 0 to 1
    let random1 = Math.random()
    let selectDistribution = cumulativeProbabilityOfDistribution.findIndex( cdf => cdf >= random1)
    return selectDistribution

}

function getCDF(candidateDistributions) {
    
    // find the size of the voter distributions
    let areasProportion = candidateDistributions.map(cd => cd.r ** 2)

    let sumAreasProportion = areasProportion.reduce( (p,c) => p + c)

    let probabilityOfDistribution = areasProportion.map( p => p / sumAreasProportion)

    // https://stackoverflow.com/a/20477613
    // [5, 10, 3, 2];
    // [5, 15, 18, 20]
    let cumulativeProbabilityOfDistribution = []
    probabilityOfDistribution.reduce(function(p,c,i) { return cumulativeProbabilityOfDistribution[i] = p+c; },0);

    return cumulativeProbabilityOfDistribution
}

function randomInsideCircle(X,Y,R) {
    // https://stackoverflow.com/a/50746409
    const r = R * Math.sqrt(Math.random())
    const theta = Math.random() * 2 * Math.PI

    // convert to cartesian

    const x = X + r * Math.cos(theta)
    const y = Y + r * Math.sin(theta)
    return {x,y}
}