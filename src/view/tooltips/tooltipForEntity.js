import tooltipBox from './tooltipBox.js'

export default function tooltipForEntity(graphic, entity, screen, viewSettings, simOptions) {
    // make a html box appear

    const tbox = tooltipBox(graphic, screen)
    const { box } = tbox

    box.innerText = '- Properties -'

    // Items //

    const items = {}

    items.exists = new Item(
        'checkbox',
        'Exists',
        'Exists: ',
        (val) => entity.setE(val ? 1 : 0),
        entity.exists === 1,
    )
    box.appendChild(items.exists.div)
    const { dimensions } = simOptions
    if (dimensions === 1) {
        if (entity.shape1.w) {
            items.w1 = new Item(
                'range',
                'Width',
                'Width: ',
                (val) => entity.setW1(val),
                entity.shape1.w,
            )
            box.appendChild(items.w1.div)
        }
        if (entity.shape1.densityProfile) {
            items.densityProfile1 = new Item(
                'select',
                'Density Profile',
                'Density Profile: ',
                (val) => entity.setDensityProfile1(val),
                entity.shape1.densityProfile,
                ['step', 'gaussian'],
            )
            box.appendChild(items.densityProfile1.div)
        }
    } else if (entity.shape2.w) {
        items.w2 = new Item(
            'range',
            'Width',
            'Width: ',
            (val) => entity.setW2(val),
            entity.shape2.w,
        )
        box.appendChild(items.w2.div)
    }
    if (entity.setColor !== undefined) {
        items.color = new Item(
            'color',
            'Color',
            'Color: ',
            (val) => entity.setColor(val),
            entity.color,
        )
        box.appendChild(items.color.div)
    }
    if (entity.setParty !== undefined) { // TODO: more parties, up to number of candidates etc
        items.party = new Item(
            'select',
            'Party',
            'Party: ',
            (val) => entity.setParty([Number(val)]),
            entity.party,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        )
        box.appendChild(items.party.div)
    }
    items.showGhosts = new Item(
        'checkbox',
        'Show Ghosts',
        'Show Ghosts: ',
        (val) => viewSettings.setShowNonExistingEntities(val),
        viewSettings.showGhosts,
    )
    box.appendChild(items.showGhosts.div)

    // Append //

    screen.tooltips.appendChild(box)
}

function Item(type, name, text, onChange, defaultValue, choices) {
    const self = this

    self.div = document.createElement('div')

    if (type === 'select') {
        self.input = document.createElement('select')
        for (let i = 0; i < choices.length; i++) {
            const option = document.createElement('option')
            option.value = choices[i]
            option.innerText = choices[i]
            self.input.appendChild(option)
        }
        self.input.value = defaultValue
        self.input.addEventListener('input', () => onChange(self.input.value))
    } else {
        self.input = document.createElement('input')
        self.input.type = type
        self.input.id = name
        self.input.name = name
        if (type === 'checkbox') {
            if (defaultValue) {
                self.input.checked = true
            }
            self.input.addEventListener('change', () => onChange(self.input.checked))
        } else if (type === 'range') {
            self.input.min = 1
            self.input.max = 300
            self.input.value = defaultValue
            self.input.step = 1
            self.input.addEventListener('input', () => onChange(self.input.value))
        } else if (type === 'color') {
            self.input.value = defaultValue
            self.input.addEventListener('input', () => onChange(self.input.value))
        }
    }
    self.label = document.createElement('label')
    self.label.for = name
    self.label.innerText = text
    self.label.style['margin-right'] = '4px'
    self.div.appendChild(self.label)
    self.div.appendChild(self.input)
}
