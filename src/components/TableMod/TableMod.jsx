import styles from './TableMod.module.css';
import { useState, useRef } from 'react';
import CodeBlock from '../Board/ResultBoard';
import List from '../List/List';
import { useDispatch, useSelector } from 'react-redux';
import { addResultTableMode, addResultTableMode2, tableModeInput, setFormatTable } from '../../redux/actions';

function TableMode() {
    const format = useSelector((state) => state.formatTABLE);
    const input1Ref = useRef(null);
    const dispatch = useDispatch();
    const globalInputTable = useSelector(state => state.tableModeInput);
    const globalCodeForCopy = useSelector((state) => state.tableModeResult);
    const globalCodeForCopy2 = useSelector((state) => state.tableModeResult2);
    const [copied, setCopied] = useState(false);
    const [resultValue, setResultValue] = useState('');
    const [tableObject, setTableObject] = useState({
        1: { key: '', value: '' }
    });

    function convert() {
        //ESTA FUNCIÓN HACE LO MISMO QUE EL HANDLEINPUT PERO NO EN TIEMPO REAL
        //SE DEBE PRESIONAR EL BOTÓN 'CONVERT'
        let newObj = {};
        let newArray = [];
        Object.entries(globalInputTable).forEach(([key, value]) => {
            let propertyKey = value.key;
            let valueKey = value.value;
            if (valueKey[0] === '[' && valueKey[valueKey.length - 1] === ']') {
                let sinCorchetes = valueKey.replace(/\[/g, '');
                sinCorchetes = sinCorchetes.replace(/\]/g, '');
                let interArray = sinCorchetes.split(',');
                for (const arr of interArray) newArray.push(arr);
                valueKey = newArray;
            }
            newObj = { ...newObj, [propertyKey]: valueKey };
        })
        // SE DESPACHA EL RESULTADO JSON CON COMILAS
        let finalResult = JSON.stringify(newObj, null, 2);
        dispatch(addResultTableMode(finalResult));

        // AHORA SE DESPACHA EL RESULTADO JSON SIN COMILAS
        finalResult = finalResult.replace(/"/g, '');
        dispatch(addResultTableMode2(finalResult));
    }

    function addTableObj() {
        //AGREGAMOS UNA NUEVA FILA DE INPUT
        //ITERAMOS EL OBJETO GLOBAL QUE ALMACENA LOS INPUT QUE SE HAN IDO AGREGANDO
        //ESTO ES PARA SABER QUÉ ID LE CORRESPONDE A LA NUEVA FILA DE INPUT
        const gate = Object.entries(globalInputTable).some(([key, value]) => {
            return value.key === '' || value.value === '';
        })
        if (gate) alert('Debes completar todas las filas');
        //SI EN EL OBJETO GLOBAL HAY AL MENOS UN INPUT INCOMPLETO, SE ARROJA UNA ALERTA
        //DE LO CONTRARIO, SE AGREGA AL OBJETO GLOBAL UNA NUEVA LISTA DE INPUT VACÍA PARA SER RELLENADA
        else {
            const id = Object.keys(globalInputTable).length + 1;
            const newObj = { key: '', value: '' };
            dispatch(tableModeInput({ newObj, id }));
        }
    }

    function handleInput(object, id) {
        //MANEJAMOS LO QUE SE ESCRIBE PARA MOSTRARLO EN PANTALLA EN TIEMPO REAL
        let objKey = object.key;
        let objValue = object.value;
        //PRIMERO LIMPIAMOS LOS ESPACIOS
        objKey = objKey.replace(/\s/g, '');
        objValue = objValue.replace(/\s/g, '');
        // CREAMOS UN OBJETO DEL INPUT Y LUEGO SETEAMOS LA TABLA DE TODOS LOS INPUTS
        const newObj = { key: objKey, value: objValue };
        const table = { ...tableObject, [id]: newObj };
        setTableObject(table);
        // DESPACHO DEL OBJETO JAVASCRIPT AL ESTADO GLOBAL PARA SER REUTILIZADO POR OTRAS FUNCIONES
        dispatch(tableModeInput({ newObj, id }));

        //FUNCIÓN DESABILITADA POR AHORA
        /* let _newObj = {};
        let newArray = [];
        //ITERAMOS LA TABLA DE LOS INPUTS
        Object.entries(table).forEach(([key, value]) => {
            let propertyKey = value.key;
            let valueKey = value.value;
            //SI EL VALOR DE UN INPUT ES UN ARRAY SE MANEJA ACÁ
            if (valueKey[0] === '[' && valueKey[valueKey.length - 1] === ']') {
                let sinCorchetes = valueKey.replace(/\[/g, '');
                sinCorchetes = sinCorchetes.replace(/\]/g, '');
                let interArray = sinCorchetes.split(',');
                for (const arr of interArray) newArray.push(arr);
                valueKey = newArray;
            }
            //AHORA SE GENERA UN OBJETO FINAL DE CADA INPUT SIN SU ID
            _newObj = { ..._newObj, [propertyKey]: valueKey };
        })
        //SE FORMATEA ESTE OBJETO Y SE DESPACHA COMO JSON CON COMILAS AL ESTADO GLOBAL
        let finalResult = JSON.stringify(_newObj, null, 2);
        dispatch(addResultTableMode(finalResult));

        // AHORA SE DESPACHA EL MISMO JSON PERO SIN COMILAS
        finalResult = finalResult.replace(/"/g, '');
        dispatch(addResultTableMode2(finalResult)); */
    }

    async function handleCopyText() {
        //SE COPIA LO QUE SE ALMACENA EN GLOBALCODEFORCOPY 1 Y 2
        //ESOS ESTADOS GLOBALES SON LOS QUE GUARDAN LOS JSON CON Y SIN COMILLAS DESDE LA FUNCIÓN HANDLEINPUT
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
        //MANEJA EL FORMATO EN QUE QUEREMOS VER EL JSON, CON O SIN COMILLAS
        //AL SIN COMILLAS LE LLAMAREMOS 'OBJETO' Y AL CON COMILLAS 'JSON'
        const name = e.target.name;
        dispatch(setFormatTable(name));
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
                    const keyDefault = globalInputTable[key].key;
                    const valueDefault = globalInputTable[key].value;
                    return (
                        <div className={styles.list}>
                            <p>{key}</p>
                            <div className={styles.ListComponent}>
                                <List id={key} keyDefault={keyDefault} valueDefault={valueDefault} handleInput={handleInput} addTableObj={addTableObj} convert={convert}/>
                            </div>
                            {/* <button>
                                ➕ Node
                            </button> */}
                        </div>
                    )
                })}
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
                    <CodeBlock text={'// Press on "Convert"'} />
                </div>
                <button onClick={handleCopyText} className={styles.copyButton}>
                    {copied ? <p>✓ Copied</p> : <p>📋 Copy</p>}
                </button>
            </div>
        </div>
    );
}

export default TableMode;