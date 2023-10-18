import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({text}) {
    const codeString = text;

    return (
        <SyntaxHighlighter language="json" style={darcula}>
            {codeString}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;
