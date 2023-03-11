const defaultStrategy = {
    score: {
        actionList: [
            {
                actionName: 'normalizeOverFrontrunners',
                actionWeight: 0.5,
                actionOptions: {
                    threshold: {
                        type: 'step',
                        mean: 0.5,
                        radius: 0.1,
                    },
                },
            },
            {
                actionName: 'normalize',
                actionWeight: 0.5,
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
    plurality: {
        actionList: [
            {
                actionName: 'closest',
                actionWeight: 0.5,
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
                actionWeight: 0.5,
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
    ranking: {
        actionList: [
            {
                actionName: 'closest',
                actionWeight: 1,
                actionOptions: {},
            },
        ],
    },
    pairwise: {
        actionList: [
            {
                actionName: 'closest',
                actionWeight: 1,
                actionOptions: {},
            },
        ],
    },
    scoreFull: {
        actionList: [
            {
                actionName: 'normalize',
                actionWeight: 1,
                actionOptions: {},
            },
        ],
    },
}

export default defaultStrategy
