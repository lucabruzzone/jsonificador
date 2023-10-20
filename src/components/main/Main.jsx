import styles from './Main.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentMode } from '../../redux/actions';
import CodeMod from '../CodeMod/CodeMod';
import TableMod from '../TableMod/TableMod';

function Main() {
    const dispatch = useDispatch();
    const [buttonSelected, setButtonSelected] = useState('code');

    function handleModalidad(e) {
        const name = e.target.name;
        setButtonSelected(name);
        dispatch(currentMode(name));
    }

    return (
        <div className={styles.view}>
            <div className={styles.titulo}>
                <h1 className={styles.h1}>JSONificator</h1>
            </div>
            <div className={styles.modalidad}>
                <button onClick={handleModalidad} name='code' id={buttonSelected === 'code' ? styles.buttonOn : styles.buttonOff} className={styles.modalidadButtons}>
                    Code
                </button>
                <button onClick={handleModalidad} name='table' id={buttonSelected === 'table' ? styles.buttonOn : styles.buttonOff} className={styles.modalidadButtons}>
                    Table
                </button>
            </div>
            <div className={styles.boxGeneral}>
                {buttonSelected === 'code' ?
                    <CodeMod/> :
                    <TableMod/>
                }
            </div>
        </div>
    );
}

export default Main;