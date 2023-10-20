
const initialState = {
    codeModCode: '',
    codeModResult: '',
    tableModCode: '',
    tableModInput: {
        1: {key: '', value: ''}
    },
    currentMode: 'code'
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADDRESULT_CODEMODE":
            return {...state, codeModResult: action.payload};

        case "ADDCODE_CODEMODE":
            return {...state, codeModCode: action.payload};

        case "ADDCODE_TABLEMODE":
            return {...state, tableModCode: action.payload};

        case "CURRENTMODE":
            return {...state, currentMode: action.payload};

        case "TABLEMODEINPUT":
            const id = action.payload.id;
            const obj = action.payload.newObj;
            const new_obj = {...state.tableModInput, [id]: obj};
            return {...state, tableModInput: new_obj};

        default:
            return {...state};
    }
};

export default rootReducer;
