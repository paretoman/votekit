import ButtonGroup from './ButtonGroup.js'

export default function MenuItem(object, prop, options, change, changes) {
    const self2 = this
    self2.list = options
    self2.onChoose = function (data) {
        // LOAD INPUT

        object[prop] = data.value
        // CONFIGURE
        self2.configure()
        // UPDATE
        change.forEach(
            (c) => changes.push(c),
        )
    }
    self2.choose = new ButtonGroup({
        label: prop,
        width: bw(2),
        data: self2.list,
        onChoose: self2.onChoose,
    })
    self2.configure = function () {
    }
    self2.select = function () {
        self2.choose.highlight('value', object[prop])
    }
}

function bw(x) { return (220 - 4 * (x - 1)) / x - 2 }
