import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSelector } from 'react-redux';

function CodeBlock({text}) {
    const mode = useSelector((state) => state.currentMode);
    const globalStateCodeMode = useSelector((state) => state.codeModResult);
    const globalStateTableMode = useSelector((state) => state.tableModCode);

    function handleMode() {
        if (mode === 'code' && globalStateCodeMode !== '') {
            return globalStateCodeMode;
        }
        else if (mode === 'table' && globalStateTableMode !== '') {
            return globalStateTableMode;
        }
        else return text;
    }

    return (
        <SyntaxHighlighter language="json" style={darcula}>
            {handleMode()}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;
