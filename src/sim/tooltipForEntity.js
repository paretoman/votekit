import hideOnClickOutside from './hideOnClickOutside.js'

export default function tooltipForEntity(entity, screen, sim) {
    // make a html box appear
    const box = document.createElement('div')

    const offset = 5 // margin plus border
    box.style.position = 'absolute'
    if (entity.x > screen.width * 0.5) {
        box.style.right = `${screen.width - (entity.x + offset)}px`
    } else {
        box.style.left = `${entity.x + offset}px`
    }
    box.style.top = `${entity.y + offset}px`
    // box.style.width = '10px'
    // box.style.height = '10px'
    box.innerText = '- Properties -'
    box.style.border = '1px solid black'
    box.style.padding = '4px'
    box.style.background = 'white'
    // screen.canvas.parentNode.appendChild(box)
    // screen.canvas.parentNode.insertBefore(box, screen.canvas)
    screen.tooltips.appendChild(box)

    const hidebox = () => {
        // box.style.display = 'none'
        box.remove()
    }

    hideOnClickOutside(box, hidebox)

    const items = {}

    items.exists = new Item(
        'checkbox',
        'Exists',
        'Exists',
        (val) => entity.setE(val ? 1 : 0),
        entity.exists === 1,
    )
    box.appendChild(items.exists.div)
    if (sim.election.dimensions === 1) {
        if (entity.w1) {
            items.w1 = new Item(
                'range',
                'Width',
                'Width',
                (val) => entity.setW1(val),
                entity.w1,
            )
            box.appendChild(items.w1.div)
        }
        if (entity.densityProfile1) {
            items.densityProfile1 = new Item(
                'select',
                'Density Profile',
                'Density Profile',
                (val) => entity.setDensityProfile1(val),
                entity.densityProfile1,
                ['step', 'gaussian'],
            )
            box.appendChild(items.densityProfile1.div)
        }
    } else if (entity.w2) {
        items.w2 = new Item(
            'range',
            'Width',
            'Width',
            (val) => entity.setW2(val),
            entity.w2,
        )
        box.appendChild(items.w2.div)
    }
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
        }
        if (type === 'range') {
            self.input.min = 1
            self.input.max = 300
            self.input.value = defaultValue
            self.input.step = 1
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
