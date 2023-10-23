export const setFormatCode = (format) => {
    return {type: "SETFORMATCODE", payload: format}
}

export const setFormatTable = (format) => {
    return {type: "SETFORMATTABLE", payload: format}
}

export const addCodeModeInput = (result) => {
    return {type: "ADDCODEMODEINPUT", payload: result}
}

export const addResultCodeMode = (code) => {
    return {type: "ADDRESULT_CODEMODE", payload: code}
}

export const addResultCodeMode2 = (code) => {
    return {type: "ADDRESULT_CODEMODE2", payload: code}
}

export const tableModeInput = (value) => {
    return {type: "TABLEMODEINPUT", payload: value}
}

export const addResultTableMode = (code) => {
    return {type: "ADDCODE_TABLEMODE", payload: code}
}

export const addResultTableMode2 = (code) => {
    return {type: "ADDCODE_TABLEMODE2", payload: code}
}

export const currentMode = (mode) => {
    return {type: "CURRENTMODE", payload: mode}
}