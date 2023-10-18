import styles from './Main.module.css';
import { useState } from 'react';
import CodeMod from '../CodeMod/CodeMod';
import TableMod from '../TableMod/TableMod';

function Main() {
    const [buttonSelected, setButtonSelected] = useState('code');

    function handleModalidad(e) {
        const name = e.target.name;
        setButtonSelected(name);
    }

    return (
        <div className={styles.view}>
            <div className={styles.titulo}>
                <h1 className={styles.h1}>JSONificador</h1>
            </div>
            <div className={styles.modalidad}>
                <button onClick={handleModalidad} name='code' id={buttonSelected === 'code' ? styles.buttonOn : styles.buttonOff} className={styles.modalidadButtons}>
                    Code
                </button>
                <button onClick={handleModalidad} name='json' id={buttonSelected === 'json' ? styles.buttonOn : styles.buttonOff} className={styles.modalidadButtons}>
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