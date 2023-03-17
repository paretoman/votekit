const defaultStrategy = [
    {
        condition: {
            voteCasterName: 'score',
        },
        actionList:
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
        actionList:
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
        actionList: [
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
        actionList: [
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
        actionList: [
            {
                actionName: 'normalize',
                actionWeight: 1,
                actionOptions: {},
            },
        ],
    },
]

export default defaultStrategy
