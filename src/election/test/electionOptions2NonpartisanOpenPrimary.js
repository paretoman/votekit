export default {
    numTracts: 2,
    numDistricts: 3,
    castOptions: {
        usr: 4,
        verbosity: 0,
    },
    numSampleCandidates: 10,
    pollCount: 5,
    sequenceOptions: {
        sequenceName: 'nonpartisan open primary',
        phases: {
            nonpartisanOpenPrimary: {
                socialChoiceMethod: 'sntv',
                voteCasterName: 'plurality',
                socialChoiceType: 'singleWinner',
                socialChoiceOptions: {
                    seats: 2,
                    threshold: 0.1,
                },
            },
            general: {
                socialChoiceMethod: 'plurality',
                voteCasterName: 'plurality',
                socialChoiceType: 'singleWinner',
                socialChoiceOptions: {
                    seats: 1,
                    threshold: 0.1,
                },
            },
        },
    },
}
