import { getCDF, sumArray } from '../../election/src/election/mathHelpers.js'
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
        (val) => entity.doSetCommand.exists(val ? 1 : 0),
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
                (val) => entity.doSetCommand.shape1w(val),
                entity.shape1.w,
            )
            box.appendChild(items.w1.div)
        }
        if (entity.shape1.densityProfile) {
            items.densityProfile1 = new Item(
                'select',
                'Density Profile',
                'Density Profile: ',
                (val) => entity.doSetCommand.shape1densityProfile(val),
                entity.shape1.densityProfile,
                { choices: ['step', 'gaussian'] },
            )
            box.appendChild(items.densityProfile1.div)
        }
    } else {
        if (entity.shape2.w) {
            items.w2 = new Item(
                'range',
                'Width',
                'Width: ',
                (val) => entity.doSetCommand.shape2w(val),
                entity.shape2.w,
            )
            box.appendChild(items.w2.div)
        }
        if (entity.shape2.densityProfile) {
            items.densityProfile2 = new Item(
                'select',
                'Density Profile',
                'Density Profile: ',
                (val) => entity.doSetCommand.shape2densityProfile(val),
                entity.shape2.densityProfile,
                { choices: ['step', 'gaussian'] },
            )
            box.appendChild(items.densityProfile2.div)
        }
    }
    if (entity.doSetCommand.color !== undefined) {
        items.color = new Item(
            'color',
            'Color',
            'Color: ',
            (val) => entity.doSetCommand.color(val),
            entity.color,
        )
        box.appendChild(items.color.div)
    }
    if (entity.doSetCommand.party !== undefined) { // TODO: more parties, up to number of candidates etc
        items.party = new Item(
            'select',
            'Party',
            'Party: ',
            (val) => entity.doSetCommand.party([Number(val)]),
            entity.party,
            { choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        )
        box.appendChild(items.party.div)
    }
    if (entity.doSetCommand.actionCDF !== undefined) {
        items.actionCDF1 = new Item(
            'range',
            'Action PDF 1',
            `Action PDF 1: ${entity.strategy.actionList[0].actionName}: `,
            (val) => {
                const { actionPDF } = entity.strategy
                actionPDF[0] = Number(val)
                if (sumArray(actionPDF) === 0) {
                    actionPDF[0] = 1
                }
                items.actionCDF1.input.value = actionPDF[0]
                items.actionCDF2.input.value = actionPDF[1]
                const actionCDF = getCDF(actionPDF)
                entity.doSetCommand.actionCDF(actionCDF)
            },
            entity.strategy.actionPDF[0],
            { min: 0, max: 1, step: 0.01 },
        )
        box.appendChild(items.actionCDF1.div)
        items.actionCDF2 = new Item(
            'range',
            'Action PDF 2',
            `Action PDF 2: ${entity.strategy.actionList[1].actionName}: `,
            (val) => {
                const { actionPDF } = entity.strategy
                actionPDF[1] = Number(val)
                if (sumArray(actionPDF) === 0) {
                    actionPDF[1] = 1
                }
                items.actionCDF1.input.value = actionPDF[0]
                items.actionCDF2.input.value = actionPDF[1]
                const actionCDF = getCDF(actionPDF)
                entity.doSetCommand.actionCDF(actionCDF)
            },
            entity.strategy.actionPDF[1],
            { min: 0, max: 1, step: 0.01 },
        )
        box.appendChild(items.actionCDF2.div)
    }
    if (entity.doSetCommand.actionList !== undefined) {
        items.actionName1 = new Item(
            'select',
            'Action 1',
            'Action 1: ',
            (val) => {
                const { actionList } = entity.strategy
                actionList[0].actionName = val
                items.actionCDF2.label.innerText = `PDF 1: ${val}: `
                entity.doSetCommand.actionList(actionList)
            },
            entity.strategy.actionList[0].actionName,
            { choices: ['normalize', 'normalizeOverFrontrunners'] },
        )
        box.appendChild(items.actionName1.div)
        items.actionName2 = new Item(
            'select',
            'Action 2',
            'Action 2: ',
            (val) => {
                const { actionList } = entity.strategy
                actionList[1].actionName = val
                items.actionCDF2.label.innerText = `PDF 2: ${val}: `
                entity.doSetCommand.actionList(actionList)
            },
            entity.strategy.actionList[1].actionName,
            { choices: ['normalize', 'normalizeOverFrontrunners'] },
        )
        box.appendChild(items.actionName2.div)
        items.actionOptionThreshold = new Item(
            'range',
            'Threshold',
            'Threshold: ',
            (val) => {
                const { actionList } = entity.strategy
                actionList[0].actionOptions.threshold.mean = Number(val)
                actionList[1].actionOptions.threshold.mean = Number(val)
                entity.doSetCommand.actionList(actionList)
            },
            entity.strategy.actionList[0].actionOptions.threshold.mean,
            { min: 0, max: 1, step: 0.01 },
        )
        box.appendChild(items.actionOptionThreshold.div)
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

function Item(type, name, text, onChange, defaultValue, options) {
    const self = this

    self.div = document.createElement('div')

    if (type === 'select') {
        self.input = document.createElement('select')
        const { choices } = options
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
            self.input.step = 1
            if (options !== undefined) {
                if (options.min !== undefined) {
                    self.input.min = options.min
                }
                if (options.max !== undefined) {
                    self.input.max = options.max
                }
                if (options.step !== undefined) {
                    self.input.step = options.step
                }
            }
            self.input.value = defaultValue
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
