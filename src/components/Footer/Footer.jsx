import React from "react";
import styles from './Footer.module.css';
import gitHubImg from '../../img/bxl-github.svg'

function Footer() {

    return (
        <div className={styles.view}>
            <div className={styles.bigContainer}>
                <div className={styles.textos}>
                    <h1>JSONificator</h1>
                    <p className={styles.comentario}>// App en desarrollo</p>
                    <p className={styles.parrafo}>Rápido conversor de formato para incluir o eliminar comillas dobles de forma inmediata, sin tener que hacerlo manualmente.</p>
                    <ul>
                        <li>Agiliza las pruebas de tu API</li>
                        <li>Evita errores de tipeo</li>
                        <li>Personaliza objetos</li>
                        <li id={styles.masFunc}>Pronto más funcionalidades 🛠 </li>
                    </ul>
                </div>
                <div className={styles.contacto}>
                    <a href="https://github.com/lucabruzzone" target="_blank" rel="noreferrer">
                        <img src={gitHubImg} alt="" />
                    </a>
                    <a href="https://github.com/lucabruzzone" target="_blank" rel="noreferrer">
                        <p>@lucabruzzone</p>
                    </a>
                </div>
                <div>
                    <p className={styles.year}>2023</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;