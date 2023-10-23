
const initialState = {
    formatCODE: 'json',
    formatTABLE: 'json',
    codeModeInput: '',
    codeModeResult: '',
    codeModeResult2: '',
    tableModeInput: {
        1: { key: '', value: '' }
    },
    tableModeResult: '',
    tableModeResult2: '',
    currentMode: 'code'
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETFORMATCODE":
            return { ...state, formatCODE: action.payload };

        case "SETFORMATTABLE":
            return { ...state, formatTABLE: action.payload };

        case "ADDCODEMODEINPUT":
            return { ...state, codeModeInput: action.payload };

        case "ADDRESULT_CODEMODE":
            return { ...state, codeModeResult: action.payload };

        case "ADDRESULT_CODEMODE2":
            return { ...state, codeModeResult2: action.payload };

        case "TABLEMODEINPUT":
            const id = action.payload.id;
            const obj = action.payload.newObj;
            /* const new_obj = { ...state.tableModeInput, [id]: obj };
            return { ...state, tableModeInput: new_obj }; */
            return { ...state, tableModeInput: {...state.tableModeInput, [id]: obj} };

        case "ADDCODE_TABLEMODE":
            return { ...state, tableModeResult: action.payload };

        case "ADDCODE_TABLEMODE2":
            return { ...state, tableModeResult2: action.payload };

        case "CURRENTMODE":
            return { ...state, currentMode: action.payload };

        default:
            return { ...state };
    }
};

export default rootReducer;
