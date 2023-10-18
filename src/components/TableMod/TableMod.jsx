import styles from './TableMod.module.css';
import { useState } from 'react';
import CodeBlock from '../Board/ResultBoard';
import List from '../List/List';

function TableMod() {
    const [resultValue, setResultValue] = useState('');
    const [copied, setCopied] = useState(false);
    const [tableObject, setTableObject] = useState({
        1: {key: '', value: ''}
    });

    function Convert() {
        let newObj = {};
        Object.entries(tableObject).forEach(([key, value]) => {
            const propertyKey = value.key;
            const valueKey = value.value;
            newObj = {...newObj, [propertyKey]: valueKey};
        })
        setResultValue(JSON.stringify(newObj));
    }

    function addTableObj() {
        const gate = Object.entries(tableObject).some(([key, value]) => {
            return value.key === '' || value.value === '';
        })
        console.log(gate);
        if (gate) alert('Debes completar todas las filas');
        else {
            const id = Object.keys(tableObject).length + 1;
            setTableObject({ ...tableObject, [id]: {key: '', value: ''} });
        }
    }

    function handleInput(object, id) {
        let objKey = object.key.trim();
        let objValue = object.value.trim();
        if (/\s/.test(objKey)) {
            objKey = objKey.replace(/\s/g, '_');
        }
        if (/\s/.test(objValue)) {
            objValue = objValue.replace(/\s/g, '_');
        }
        setTableObject({...tableObject, [id]: {key: objKey, value: objValue}});
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
            <div className={styles.paramsContainer}>
                <div className={styles.listParam}>
                    <div className={styles.inputContainer}>
                        <p>nº</p>
                        <p className={styles.inputProperty}>Key</p>
                        <p className={styles.inputValue}>Value</p>
                    </div>
                    <button onClick={addTableObj}>
                        ➕ New
                    </button>
                </div>
            </div>
            <div className={styles.boxSolicitud}>
                {Object.entries(tableObject).map(([key, value]) => {
                    return (
                        <div id={key} className={styles.list}>
                            <p id={key}>{key}</p>
                            <div className={styles.ListComponent}>
                                <List id={key} handleInput={handleInput} />
                            </div>
                            <button id={key}>
                                ➕ Node
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className={styles.boxResultado}>
                <div className={styles.boxNav}>
                    <div name='json' className={styles.boxNavOn}>JSON</div>
                    <button onClick={Convert} name='json' className={styles.boxNavButton}>Convert</button>
                </div>
                <div className={styles.resultado}>
                <CodeBlock text={resultValue ? resultValue : '// Press on "Convert"'} />
                </div>
                <button onClick={handleCopyText} className={styles.copyButton}>
                    {copied ? <p>✓ Copied</p> : <p>📋 Copy</p>}
                </button>
            </div>
        </div>
    );
}

export default TableMod;