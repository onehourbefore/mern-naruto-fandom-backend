const makeUnique = (arr) => {
    const uniqSet = new Set (arr)
    return Array.from (uniqSet)
}
module.exports = makeUnique