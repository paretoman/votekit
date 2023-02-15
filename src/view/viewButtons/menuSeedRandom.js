export default function menuSeedRandom(menu, simOptions) {
    menu.addMenuItem({
        label: 'Sampling Seed:',
        explain: 'The sampling seed can either be constant or random. '
        + 'Setting the seed to random means every time the sampler starts, '
        + 'it will choose a random sampling seed. '
        + 'The seed is used to sample the same candidates each time, '
        + 'no matter if the other settings change. '
        + 'The only way things would be different '
        + 'is if the size of the candidate distributions change '
        + 'or if the number of candidate distributions change.',
        options: [
            { name: 'Random', value: true, explain: 'New seed for each sampling run.' },
            { name: 'Constant', value: false, explain: 'Same seed for each sampling run.' },
        ],
        changeList: ['seedRandom'],
        getValue: () => simOptions.seedRandom,
        onChoose: (o) => {
            simOptions.setSeedRandom(o.value)
        },
    })
}
