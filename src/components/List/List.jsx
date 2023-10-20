import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './List.module.css';

function List({ id, handleInput, addTableObj }) {
    const globalInputTable = useSelector(state => state.tableModInput);
    const keyDefault = globalInputTable[id].key;
    const valueDefault = globalInputTable[id].value;
    const [inputValue, setInputValue] = useState({});
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    function handleTable(e, currentInputRef, nextInputRef) {
        const value = e.target.value;
        const property = e.target.name;
        setInputValue({ ...inputValue, [property]: value })
        if (Object.keys(inputValue).length === 2) {
            handleInput({ ...inputValue, [property]: value }, id);
        }

        if(currentInputRef && nextInputRef) {
            currentInputRef.current.addEventListener('input', (event) => {
                if (event.target.value.length === event.target.maxLength) {
                    nextInputRef.current.focus();
                }
            });
        }
    }

    const handleKeyPress = (currentInputRef, nextInputRef) => {
        return (event) => {
            if (event.code === 'Space') {
                event.preventDefault(); // Evita enviar el formulario si está dentro de un formulario
                nextInputRef.current.focus();
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                addTableObj();
            }
        };
    };

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTableObj();
        }
    };

    return (
        <div className={styles.inputContainer}>
            <input defaultValue={keyDefault} autoComplete="off" placeholder='ej. name' ref={input1Ref} autoFocus name='key' id={id} onChange={(e) => {handleTable(e, input1Ref, input2Ref)}} className={styles.inputProperty} onKeyPress={handleKeyPress(input1Ref, input2Ref)} type="text"/>
            <hr className={styles.hr} />
            <input defaultValue={valueDefault} autoComplete="off" placeholder='Pepe' ref={input2Ref} name='value' id={id} onChange={(e) => handleTable(e, null, null)} className={styles.inputValue} onKeyDown={handleKeyDown} type="text"/>
        </div>
    );
}

export default List;