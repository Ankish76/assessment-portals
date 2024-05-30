export const objectToParams = (objectData: any) => {
    return Object.keys(objectData).map(objKey => ({
        Param: objKey,
        Value: objectData[objKey]
    }))
}