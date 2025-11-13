// Define the Decoding Dictionary
// Only add to the end of the list to ensure consistency.
export const decodingDictionary = [
    // candidateDns
    'candidateDns-exists',
    'candidateDns-party',
    'candidateDns-setNumberAtLeast',
    'candidateDns-shape1D-densityProfile',
    'gaussian',
    'step',

    'candidateDns-shape1D-width',
    'candidateDns-shape1D-x',
    'candidateDns-shape2D-densityProfile',
    'candidateDns-shape2D-point',
    'x',
    'y',

    'candidateDns-shape2D-width',

    // candidates
    'candidates-color',
    '#e05020',
    '#50e020',
    '#2050e0',
    '#e0e020',

    'candidates-exists',
    'candidates-party',
    'candidates-setNumberAtLeast',
    'candidates-shape1D-x',
    'candidates-shape2D-point',

    // voters
    'voters-exists',
    'voters-party',
    'voters-setNumberAtLeast',
    'voters-shape1D-densityProfile',
    'voters-shape1D-width',
    'voters-shape1D-x',
    'voters-shape2D-densityProfile',
    'voters-shape2D-point',
    'voters-shape2D-width',
    'voters-strategyRules',

    // options
    'dimensions',

    'mode',
    'one',
    'sample',

    'numDistricts',
    'numTracts',
    'seedRandom',
    'seeds',

    'sequenceName',
    'general',
    'closedPrimary',

    'socialChoiceMethod-sequence-closedPrimary-phase-closedPrimary',
    'socialChoiceMethod-sequence-closedPrimary-phase-general',
    'socialChoiceMethod-sequence-general-phase-general',
    'socialChoiceMethod-sequence-nonpartisanOpenPrimary-phase-general',
    'socialChoiceMethod-sequence-nonpartisanOpenPrimary-phase-nonpartisanOpenPrimary',

    // social Choice Methods
    'allocatedScore',
    'dHondt',
    'huntingtonHill',
    'methodOfEqualShares',
    'minimax',
    'olprA',
    'plurality',
    'randomCandidate',
    'randomVoter',
    'sainteLague',
    'score',
    'sntv',
    'stv',

    // voters strategy rules
    'condition',

    'voteCasterName',
    'score',
    'ranking',
    'pairwise',
    'scoreFull',

    'strategy',

    'actionName',
    'normalize',
    'normalizeOverFrontrunners',
    'closest',
    'lesserEvil',

    'actionOptions',
    'threshold',
    'mean',
    'radius',
    'type',

    'actionWeight',

]

// Create an Encoding Dictionary:
// Create a reverse mapping
export const encodingDictionary = {}
const keys = Object.keys(decodingDictionary)
for (let i = 0; i < keys.length; i++) {
    const shortKey = keys[i]
    encodingDictionary[decodingDictionary[shortKey]] = shortKey
}
