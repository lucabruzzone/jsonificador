export const addResultCodeMod = (code) => {
    return {type: "ADDRESULT_CODEMODE", payload: code}
}

export const addCodeCodeMod = (result) => {
    return {type: "ADDCODE_CODEMODE", payload: result}
}

export const addCodeTableMod = (code) => {
    return {type: "ADDCODE_TABLEMODE", payload: code}
}

/* export const tableNonStringify = (result) => {
    return {type: "ADDCODE_TABLEMODOBJECT", payload: result}
} */

export const currentMode = (mode) => {
    return {type: "CURRENTMODE", payload: mode}
}

export const tableModeInput = (value) => {
    return {type: "TABLEMODEINPUT", payload: value}
}