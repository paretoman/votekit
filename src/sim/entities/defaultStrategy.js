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
}

export default defaultStrategy
