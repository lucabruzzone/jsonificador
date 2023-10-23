import styles from './CodeMode.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from '../main/Functions';
import CodeBlock from '../Board/ResultBoard';
import Editor from '@monaco-editor/react';
import { addCodeModeInput, addResultCodeMode, addResultCodeMode2, setFormatCode } from '../../redux/actions';

function CodeMod() {
    const format = useSelector((state) => state.formatCODE);
    const globalStateInput = useSelector((state) => state.codeModeInput);
    const globalCodeForCopy = useSelector((state) => state.codeModeResult);
    const globalCodeForCopy2 = useSelector((state) => state.codeModeResult2);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('// Press on "Convert"');
    const [resultValue, setResultValue] = useState(null);
    const [copied, setCopied] = useState(false);

    function convert() {
        const open = globalStateInput[0];
        const close = globalStateInput[globalStateInput.length - 1];
        if ((open === '{' && close === '}') || (open === '[' && close === ']')) {
            const stringifyValue = stringify(globalStateInput);
            let finalResult = JSON.stringify(stringifyValue, null, 2);
            setResultValue(finalResult);
            dispatch(addResultCodeMode(finalResult));

            // ahora se despacha el resultado 2 sin comillas
            finalResult = finalResult.replace(/"/g, '');
            dispatch(addResultCodeMode2(finalResult));
        }
        else alert('La sintaxis del código ingresado no es válida')
    }

    function handleInput(value) {
        setInputValue(value);
        dispatch(addCodeModeInput(value));
    }

    async function handleCopyText() {
        try {
            if (format === 'json') {
                await navigator.clipboard.writeText(globalCodeForCopy);
            }
            else if (format === 'object') {
                await navigator.clipboard.writeText(globalCodeForCopy2);
            }
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, "3000");

        } catch (error) {
            console.log('Error al copiar al portapapeles');
        }
    }

    function handleFormat(e) {
        const name = e.target.name;
        dispatch(setFormatCode(name));
    }

    return (
        <div className={styles.boxMain}>
            <div className={styles.boxSolicitud}>
                <div className={styles.boxNav}>
                    <div name='json' className={styles.boxNavOn}></div>
                </div>
                <Editor value={globalStateInput} onChange={handleInput} height='220px' defaultLanguage="markdown" theme='vs-dark' />
            </div>
            <div className={styles.boxResultado}>
                <div className={styles.boxNavResultado}>
                    <div name='json' className={styles.boxFormat}>
                        <button name='json' onClick={handleFormat} className={format === 'json' ? styles.buttonOn : styles.buttonOff} id={styles.boxNavButtonFormat}>Json</button>
                        <button name='object' onClick={handleFormat} className={format === 'object' ? styles.buttonOn : styles.buttonOff} id={styles.boxNavButtonFormat}>Object</button>
                    </div>
                    <button onClick={convert} name='json' className={styles.boxNavButtonConvert}>Convert</button>
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