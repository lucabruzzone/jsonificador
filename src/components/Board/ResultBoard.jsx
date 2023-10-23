import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSelector } from 'react-redux';

function CodeBlock({text}) {
    const mode = useSelector((state) => state.currentMode);
    const formatCode = useSelector((state) => state.formatCODE);
    const formatTable = useSelector((state) => state.formatTABLE);
    const globalStateCodeMode = useSelector((state) => state.codeModeResult);
    const globalStateCodeMode2 = useSelector((state) => state.codeModeResult2);
    const globalStateTableMode = useSelector((state) => state.tableModeResult);
    const globalStateTableMode2 = useSelector((state) => state.tableModeResult2);

    function handleMode() {
        //SE ANALIZAN LOS GLOBALES DONDE SE GUARDAN LOS JSON DE RESULTADOS
        //TANTO SIN COMILLAS COMO CON COMILLAS
        if (mode === 'code') {
            if (formatCode === 'json' && globalStateCodeMode !== '') {
                return globalStateCodeMode;
            }
            else if (globalStateCodeMode2) return globalStateCodeMode2;
            return text;
        }
        else if (mode === 'table') {
            if (formatTable === 'json' && globalStateTableMode !== '') {
                return globalStateTableMode;
            }
            else if (globalStateTableMode2) return globalStateTableMode2;
            return text;
        }
        return text;
    }

    return (
        <SyntaxHighlighter language="json" style={darcula}>
            {handleMode()}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;
