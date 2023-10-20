import styles from './CodeMode.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from '../main/Functions';
import CodeBlock from '../Board/ResultBoard';
import Editor from '@monaco-editor/react';
import { addCodeCodeMod, addResultCodeMod } from '../../redux/actions';

function CodeMod() {
    const globalStateResult = useSelector((state) => state.codeModResult);
    const globalCodeForCopy = useSelector((state) => state.codeModCode);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('// Press on "Convert"');
    const [resultValue, setResultValue] = useState(null);
    const [copied, setCopied] = useState(false);

    function Convert() {
        const open = globalCodeForCopy[0];
        const close = globalCodeForCopy[globalCodeForCopy.length - 1];
        if (open === '{' && close === '}') {
        }
        const stringifyValue = stringify(globalCodeForCopy);
        const finalResult = JSON.stringify(stringifyValue, null, 2);
        setResultValue(finalResult);
        dispatch(addResultCodeMod(finalResult));
    }

    function handleInput(value) {
        setInputValue(value);
        dispatch(addCodeCodeMod(value));
    }

    async function handleCopyText() {
        try {
            await navigator.clipboard.writeText(globalCodeForCopy);
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
                <Editor value={globalCodeForCopy} onChange={handleInput} height='220px' defaultLanguage="markdown" theme='vs-dark' />
            </div>
            <div className={styles.boxResultado}>
                <div className={styles.boxNavResultado}>
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