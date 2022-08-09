export const updateObjInArray = <T extends Record<string, any>, U = {}>(
    items: Array<T>,
    itemId: number,
    objKeyName: keyof T,
    objUpdatedProps: U
): Array<T> => {
    return items.map(item => {
        return item[objKeyName] === itemId ? {...item, ...objUpdatedProps} : item
    })
}