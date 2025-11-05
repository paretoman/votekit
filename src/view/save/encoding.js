// A prefix to differentiate between encoded keys and other strings
const ESCAPE_PREFIX = '$'

// Function to encode an object, adding an escape prefix
export function encodeObject(obj, dict) { // Check if the object is a number and avoid encoding it
    if (typeof obj === 'number') {
        return obj
    }
    if (typeof obj !== 'object' || obj === null) {
        // Encode values only if a matching short key is found
        const encodedValue = dict[obj]
        return encodedValue ? `${ESCAPE_PREFIX}${encodedValue}` : obj
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => encodeObject(item, dict))
    }

    const encodedObj = {}
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const encodedKey = dict[key] ? `${ESCAPE_PREFIX}${dict[key]}` : key
        encodedObj[encodedKey] = encodeObject(obj[key], dict)
    }
    return encodedObj
}

// Function to decode an object, removing the escape prefix
export function decodeObject(obj, dict) {
    if (typeof obj !== 'object' || obj === null) {
        // Decode values only if they have the escape prefix
        return (typeof obj === 'string' && obj.startsWith(ESCAPE_PREFIX))
            ? dict[obj.substring(ESCAPE_PREFIX.length)] || obj
            : obj
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => decodeObject(item, dict))
    }

    const decodedObj = {}
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const decodedKey = key.startsWith(ESCAPE_PREFIX)
            ? dict[key.substring(ESCAPE_PREFIX.length)] || key
            : key
        decodedObj[decodedKey] = decodeObject(obj[key], dict)
    }
    return decodedObj
}
