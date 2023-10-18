import styles from './CodeMode.module.css';
import { useEffect, useState } from 'react';
import { stringify } from '../main/Functions';
import CodeBlock from '../Board/ResultBoard';
import Editor from '@monaco-editor/react';

function CodeMod() {
    const [inputValue, setInputValue] = useState('// Press on "Convert"');
    const [resultValue, setResultValue] = useState(null);
    const [copied, setCopied] = useState(false);

    function Convert() {
        const open = inputValue[0];
        const close = inputValue[inputValue.length - 1];
        if (open === '{' && close === '}') {
            const stringifyValue = stringify(inputValue);
            setResultValue(JSON.stringify(stringifyValue));
        }
    }

    function handleInput(value) {
        setInputValue(value);
    }

    async function handleCopyText() {
        try {
            await navigator.clipboard.writeText(resultValue);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, "3000");

        } catch (error) {
            console.log('Error al copiar al portapapeles');
        }
    }

    return (
        <div className={styles.boxMain}>
            <div className={styles.boxSolicitud}>
                <div className={styles.boxNav}>
                    <div name='json' className={styles.boxNavOn}></div>
                </div>
                <Editor onChange={handleInput} height='220px' defaultLanguage="markdown" theme='vs-dark' />
            </div>
            <div className={styles.boxResultado}>
                <div className={styles.boxNav}>
                    <div name='json' className={styles.boxNavOn}>JSON</div>
                    <button onClick={Convert} name='json' className={styles.boxNavButton}>Convert</button>
                </div>
                <div className={styles.resultado}>
                    <CodeBlock text={resultValue ? resultValue : inputValue} />
                </div>
                <button onClick={handleCopyText} className={styles.copyButton}>
                    {copied ? <p>✓ Copied</p> : <p>📋 Copy</p>}
                </button>
            </div>
        </div>
    );
}

export default CodeMod;