import ButtonGroup from './ButtonGroup.js'

export default function MenuItem(object, prop, setProp, label, options, change, changes) {
    // Make a selection that determines a single property's value.
    // Defer handling dependent calculations to the next update step,
    // where we will look at a dependency tree to determine what else needs updating.

    const self = this
    self.list = options
    self.onChoose = function (data) {
        // LOAD INPUT

        setProp(data.value)
        // CONFIGURE
        self.configure()
        // UPDATE
        changes.add(change)
    }
    self.choose = new ButtonGroup({
        label,
        width: bw(2),
        data: self.list,
        onChoose: self.onChoose,
    })
    self.configure = function () {
    }
    self.select = function () {
        self.choose.highlight('value', object[prop])
    }
}

function bw(x) { return (220 - 4 * (x - 1)) / x - 2 }
