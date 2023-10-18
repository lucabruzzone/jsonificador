import React, { useState, useRef } from 'react';
import styles from './List.module.css';

function List({ id, handleInput }) {
    const [inputValue, setInputValue] = useState({});
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);

    function handleTable(e, currentInputRef, nextInputRef) {
        const value = e.target.value;
        const property = e.target.name;
        setInputValue({ ...inputValue, [property]: value })
        if (Object.keys(inputValue).length === 2) {
            handleInput(inputValue, id);
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
            if (event.key === 'Enter') {
                event.preventDefault(); // Evita enviar el formulario si está dentro de un formulario
                nextInputRef.current.focus();
            }
        };
    };

    return (
        <div className={styles.inputContainer}>
            <input ref={input1Ref} autoFocus name='key' id={id} onChange={(e) => {handleTable(e, input1Ref, input2Ref)}} className={styles.inputProperty} onKeyPress={handleKeyPress(input1Ref, input2Ref)} type="text" placeholder='' />
            <hr className={styles.hr} />
            <input ref={input2Ref} name='value' id={id} onChange={(e) => handleTable(e, null, null)} className={styles.inputValue} type="text" placeholder='' />
        </div>
    );
}

export default List;