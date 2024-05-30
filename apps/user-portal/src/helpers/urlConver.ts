export const valueToUrl = (val: string) => {
    return val.replace(' ','_')
}

export const urlToValue = (val: string) => {
    return val.replace('_',' ')
}

