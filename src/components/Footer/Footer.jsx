import React from "react";
import styles from './Footer.module.css';
import gitHubImg from '../../img/bxl-github.svg'

function Footer() {

    return (
        <div className={styles.view}>
            <div className={styles.bigContainer}>
                <div>
                    <h1>JSONificador</h1>
                    <p className={styles.comentario}>// App en desarrollo</p>
                    <p>Rápido conversor a formato json, para incluir comillas dobles de forma inmdiata, optimizando el tiempo de testeo de tu API</p>
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