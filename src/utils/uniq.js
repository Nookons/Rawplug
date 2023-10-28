async function uniqBarrel(array) {
    const uniqValues = new Set();
    const uniqObjects = array.filter(object => {
        if (!uniqValues.has(object.batchNumber)) {
            uniqValues.add(object.batchNumber)
            return true
        }
        return false
    })
    return uniqObjects
}

export default uniqBarrel