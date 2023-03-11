const defaultStrategy = {
    score: {
        actionList: [
            {
                actionName: 'normalizeOverFrontrunners',
                actionWeight: 0.5,
                actionOptions: {
                    threshold: {
                        type: 'normal',
                        mean: 0.5,
                        stdDev: 0.1,
                    },
                },
            },
            {
                actionName: 'normalize',
                actionWeight: 0.5,
                actionOptions: {
                    threshold: {
                        type: 'normal',
                        mean: 0.5,
                        stdDev: 0.1,
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
                        type: 'normal',
                        mean: 0.5,
                        stdDev: 0.1,
                    },
                },
            },
            {
                actionName: 'lesserEvil',
                actionWeight: 0.5,
                actionOptions: {
                    threshold: {
                        type: 'normal',
                        mean: 0.5,
                        stdDev: 0.1,
                    },
                },
            },
        ],

    },
}

export default defaultStrategy
