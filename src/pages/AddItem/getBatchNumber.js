export function getBatchNumber ({item, lastNumber}) {
    switch (item.type) {
        case 'Barrel':
            switch (item.batchNumber) {
                case null:
                    return lastNumber + 1
                default:
                    return item.batchNumber
            }
        default:
            return null
    }
}