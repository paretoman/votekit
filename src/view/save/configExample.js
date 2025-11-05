/* eslint-disable linebreak-style */

const configExample = {
    'candidateDns-exists': [
        1,
    ],
    'candidateDns-party': [
        [
            0,
        ],
    ],
    'candidateDns-setNumberAtLeast': 1,
    'candidateDns-shape1D-densityProfile': [
        'gaussian',
    ],
    'candidateDns-shape1D-width': [
        200,
    ],
    'candidateDns-shape1D-x': [
        150,
    ],
    'candidateDns-shape2D-densityProfile': [
        'step',
    ],
    'candidateDns-shape2D-point': [
        {
            x: 150,
            y: 150,
        },
    ],
    'candidateDns-shape2D-width': [
        200,
    ],
    'candidates-color': [
        '#e05020',
        '#50e020',
        '#2050e0',
    ],
    'candidates-exists': [
        1,
        1,
        1,
    ],
    'candidates-party': [
        [
            0,
        ],
        [
            1,
        ],
        [
            2,
        ],
    ],
    'candidates-setNumberAtLeast': 3,
    'candidates-shape1D-x': [
        50,
        100,
        200,
    ],
    'candidates-shape2D-point': [
        {
            x: 50,
            y: 100,
        },
        {
            x: 100,
            y: 50,
        },
        {
            x: 200,
            y: 250,
        },
    ],
    dimensions: 2,
    mode: 'one',
    numDistricts: 1,
    numTracts: 1,
    seedRandom: true,
    seeds: [],
    sequenceName: 'general',
    'socialChoiceMethod-sequence-closedPrimary-phase-closedPrimary': 'plurality',
    'socialChoiceMethod-sequence-closedPrimary-phase-general': 'plurality',
    'socialChoiceMethod-sequence-general-phase-general': 'plurality',
    'socialChoiceMethod-sequence-nonpartisanOpenPrimary-phase-general': 'plurality',
    'socialChoiceMethod-sequence-nonpartisanOpenPrimary-phase-nonpartisanOpenPrimary': 'plurality',
    'voters-exists': [
        1,
        1,
        1,
    ],
    'voters-party': [
        [
            0,
        ],
        [
            1,
        ],
        [
            2,
        ],
    ],
    'voters-setNumberAtLeast': 2,
    'voters-shape1D-densityProfile': [
        'gaussian',
        'gaussian',
        'gaussian',
    ],
    'voters-shape1D-width': [
        200,
        200,
        200,
    ],
    'voters-shape1D-x': [
        150,
        50,
        50,
    ],
    'voters-shape2D-densityProfile': [
        'step',
        'step',
        'step',
    ],
    'voters-shape2D-point': [
        {
            x: 150,
            y: 150,
        },
        {
            x: 138,
            y: 96,
        },
        {
            x: 50,
            y: 50,
        },
    ],
    'voters-shape2D-width': [
        200,
        200,
        200,
    ],
    'voters-strategyRules': [
        [
            {
                condition: {
                    voteCasterName: 'score',
                },
                strategy: [
                    {
                        actionName: 'normalize',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 1,
                    },
                    {
                        actionName: 'normalizeOverFrontrunners',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 0,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'plurality',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 1,
                    },
                    {
                        actionName: 'lesserEvil',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 0,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'ranking',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'pairwise',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'scoreFull',
                },
                strategy: [
                    {
                        actionName: 'normalize',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
        ],
        [
            {
                condition: {
                    voteCasterName: 'score',
                },
                strategy: [
                    {
                        actionName: 'normalize',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 1,
                    },
                    {
                        actionName: 'normalizeOverFrontrunners',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 0,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'plurality',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 1,
                    },
                    {
                        actionName: 'lesserEvil',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 0,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'ranking',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'pairwise',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'scoreFull',
                },
                strategy: [
                    {
                        actionName: 'normalize',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
        ],
        [
            {
                condition: {
                    voteCasterName: 'score',
                },
                strategy: [
                    {
                        actionName: 'normalize',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 1,
                    },
                    {
                        actionName: 'normalizeOverFrontrunners',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 0,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'plurality',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 1,
                    },
                    {
                        actionName: 'lesserEvil',
                        actionOptions: {
                            threshold: {
                                mean: 0.5,
                                radius: 0.1,
                                type: 'step',
                            },
                        },
                        actionWeight: 0,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'ranking',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'pairwise',
                },
                strategy: [
                    {
                        actionName: 'closest',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
            {
                condition: {
                    voteCasterName: 'scoreFull',
                },
                strategy: [
                    {
                        actionName: 'normalize',
                        actionOptions: {},
                        actionWeight: 1,
                    },
                ],
            },
        ],
    ],
}

export default configExample
