import styles from './TableMod.module.css';
import { useState, useRef } from 'react';
import CodeBlock from '../Board/ResultBoard';
import List from '../List/List';
import { useDispatch, useSelector } from 'react-redux';
import { addCodeTableMod, tableModeInput } from '../../redux/actions';

function TableMod() {
    const input1Ref = useRef(null);
    const dispatch = useDispatch();
    const globalInputTable = useSelector(state => state.tableModInput);
    const globalCodeForCopy = useSelector((state) => state.tableModCode);
    const [resultValue, setResultValue] = useState('');
    const [copied, setCopied] = useState(false);
    const [tableObject, setTableObject] = useState({
        1: { key: '', value: '' }
    });

    function Convert() {
        let newObj = {};
        Object.entries(globalInputTable).forEach(([key, value]) => {
            const propertyKey = value.key;
            const valueKey = value.value;
            newObj = { ...newObj, [propertyKey]: valueKey };
        })
        const finalResult = JSON.stringify(newObj, null, 2);
        setResultValue(finalResult);
        dispatch(addCodeTableMod(finalResult));
    }

    function addTableObj() {
        const gate = Object.entries(globalInputTable).some(([key, value]) => {
            return value.key === '' || value.value === '';
        })
        console.log(gate);
        if (gate) alert('Debes completar todas las filas');
        else {
            const id = Object.keys(tableObject).length + 1;
            const newObj = { key: '', value: '' };
            setTableObject({ ...tableObject, [id]: newObj });
            dispatch(tableModeInput({ newObj, id }));
        }
    }

    function handleInput(object, id) {
        let objKey = object.key;
        let objValue = object.value;
        objKey = objKey.replace(/\s/g, '');
        objValue = objValue.replace(/\s/g, '');
        const newObj = { key: objKey, value: objValue };
        setTableObject({ ...tableObject, [id]: newObj });
        dispatch(tableModeInput({ newObj, id }));
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
            <div className={styles.paramsContainer}>
                <div className={styles.listParam}>
                    <div className={styles.inputContainer}>
                        <p>nº</p>
                        <p className={styles.inputProperty}>Key</p>
                        <p className={styles.inputValue}>Value</p>
                    </div>
                    <button ref={input1Ref} onClick={addTableObj}>
                        New ＋
                    </button>
                </div>
            </div>
            <div className={styles.boxSolicitud}>
                {Object.entries(globalInputTable).map(([key, value]) => {
                    return (
                        <div className={styles.list}>
                            <p>{key}</p>
                            <div className={styles.ListComponent}>
                                <List id={key} handleInput={handleInput} addTableObj={addTableObj} />
                            </div>
                            <button>
                                ➕ Node
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className={styles.boxResultado}>
                <div className={styles.boxNavResultado}>
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