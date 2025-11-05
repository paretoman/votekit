import parsedObject1 from './configExample.js'

// Define the Decoding Dictionary

function findAndSortStrings(parsedObject) {
    const strings = getUniqueSortedStringsFromJson(parsedObject)
    strings.sort()
    return strings
}

function getUniqueSortedStringsFromJson(jsonObject) {
    const uniqueStrings = new Set()

    function traverse(obj) {
        if (typeof obj === 'object' && obj !== null) {
            const keys = Object.keys(obj)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                // Add key if it's a string
                if (typeof key === 'string') {
                    uniqueStrings.add(key)
                }
                // Recursively traverse the value
                traverse(obj[key])
            }
        } else if (typeof obj === 'string') {
            // Add value if it's a string
            uniqueStrings.add(obj)
        }
    }

    traverse(jsonObject)

    // Convert Set to Array and sort alphabetically
    const sortedStrings = Array.from(uniqueStrings).sort()
    return sortedStrings
}

const sortedStrings = findAndSortStrings(parsedObject1)
export const decodingDictionary = sortedStrings

// Create an Encoding Dictionary:
// Create a reverse mapping
export const encodingDictionary = {}
const keys = Object.keys(decodingDictionary)
for (let i = 0; i < keys.length; i++) {
    const shortKey = keys[i]
    encodingDictionary[decodingDictionary[shortKey]] = shortKey
}
