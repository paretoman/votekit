/**
 * Store Data for later download.
 * @param {Publisher} pub
 * @param {Changes} changes
 */
export default function ViewDownload(pub, changes) {
    const self = this

    pub.attach(self)

    self.dataStore = {}

    self.update = (simData) => {
        if (changes.checkNone()) return

        self.dataStore = simData
    }
}
