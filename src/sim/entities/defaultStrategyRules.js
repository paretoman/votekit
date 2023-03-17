const defaultStrategyRules = [
    {
        condition: {
            voteCasterName: 'score',
        },
        strategy:
            [
                {
                    actionName: 'normalize',
                    actionWeight: 1,
                    actionOptions: {
                        threshold: {
                            type: 'step',
                            mean: 0.5,
                            radius: 0.1,
                        },
                    },
                },
                {
                    actionName: 'normalizeOverFrontrunners',
                    actionWeight: 0,
                    actionOptions: {
                        threshold: {
                            type: 'step',
                            mean: 0.5,
                            radius: 0.1,
                        },
                    },
                },
            ],

    },
    {
        condition: {
            voteCasterName: 'plurality',
        },
        strategy:
            [
                {
                    actionName: 'closest',
                    actionWeight: 1,
                    actionOptions: {
                        threshold: {
                            type: 'step',
                            mean: 0.5,
                            radius: 0.1,
                        },
                    },
                },
                {
                    actionName: 'lesserEvil',
                    actionWeight: 0,
                    actionOptions: {
                        threshold: {
                            type: 'step',
                            mean: 0.5,
                            radius: 0.1,
                        },
                    },
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
                actionWeight: 1,
                actionOptions: {},
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
                actionWeight: 1,
                actionOptions: {},
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
                actionWeight: 1,
                actionOptions: {},
            },
        ],
    },
]

export default defaultStrategyRules
